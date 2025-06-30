// scrap.js
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { load } from "cheerio";

async function main() {
  console.log(
    "⚙️ Using SUPABASE_SERVICE_ROLE:",
    process.env.SUPABASE_SERVICE_ROLE?.slice(0, 8),
    "…"
  );

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
  );

  // Test insert isolé
  {
    const { data: c } = await supabase.from("cities").select("id").limit(1);
    const { data: i } = await supabase.from("items").select("id").limit(1);
    const testRow = {
      city_id: c[0].id,
      item_id: i[0].id,
      fetched_at: new Date(),
      average: 123.45,
    };
    console.log("→ TEST INSERT:", testRow);
    const { error: te } = await supabase
      .from("price_measurements")
      .insert(testRow);
    if (te) {
      console.error("❌ Test insert failed:", JSON.stringify(te, null, 2));
      process.exit(1);
    } else {
      console.log("✅ Test insert OK");
    }
  }

  // Chargement des données de config
  const { data: cities, error: errC } = await supabase
    .from("cities")
    .select("id,name");
  if (errC) throw errC;
  const { data: items, error: errI } = await supabase
    .from("items")
    .select("id,name");
  if (errI) throw errI;
  const itemMap = new Map(items.map(({ name, id }) => [name, id]));

  // Scraping principal
  for (const { id: city_id, name: cityName } of cities) {
    console.log(`\n→ Scraping ${cityName}`);
    let html;
    try {
      const url = `https://www.numbeo.com/cost-of-living/in/${cityName.replace(
        / /g,
        "-"
      )}`;
      const res = await fetch(url);
      console.log("   HTTP status:", res.status);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      html = await res.text();
    } catch (e) {
      console.error(`   Fetch failed for ${cityName}:`, e);
      continue;
    }

    const $ = load(html);
    const now = new Date();
    const batch = [];

    $("table.data_wide_table tr").each((_, tr) => {
      const cols = $(tr).find("td");
      if (cols.length < 2) return;
      const label = $(cols[0]).text().trim();
      if (!label || label.toLowerCase().includes("edit")) return;
      const raw = $(cols[1]).text().trim();
      const avgStr = raw.split(" ")[0];
      const avg = parseFloat(avgStr.replace(/[^0-9.]/g, ""));
      if (Number.isNaN(avg)) return;
      const item_id = itemMap.get(label);
      if (!item_id) return;
      batch.push({ city_id, item_id, fetched_at: now, average: avg });
    });

    console.log(
      `   Batch to insert (${batch.length} rows)`,
      batch.map((b) => ({ item_id: b.item_id, average: b.average }))
    );

    if (batch.length === 0) {
      console.log(`✓ ${cityName} — aucun item à insérer`);
      continue;
    }

    // <-- Ici, on ne lit plus inserted.length mais batch.length -->
    const { error: insErr } = await supabase
      .from("price_measurements")
      .insert(batch);

    if (insErr) {
      console.error(
        `   Insert error for ${cityName}:`,
        JSON.stringify(insErr, null, 2)
      );
    } else {
      console.log(`✓ ${cityName} — ${batch.length} valeurs insérées`);
    }
  }
}

main().catch((fatal) => {
  console.error("Erreur fatale :", fatal);
  process.exit(1);
});
