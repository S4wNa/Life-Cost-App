import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useParams } from "react-router-dom";

export default function Information() {
  const { countryName } = useParams();

  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadInfo() {
      setLoading(true);
      setError(null);
      setGroups({});

      try {
        // 1) On interroge la vue measurements_enriched filtrée sur country_name
        const { data, error: err } = await supabase
          .from("measurements_enriched")
          .select("category_name, item_name, average, currency")
          .eq("country_name", countryName);

        if (err) throw err;

        // 2) On groupe par category_name
        const grouped = (data || []).reduce((acc, row) => {
          const cat = row.category_name || "Sans catégorie";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(row);
          return acc;
        }, {});

        setGroups(grouped);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadInfo();
  }, [countryName]);

  if (loading)
    return <p className="text-white text-center mt-8">Chargement…</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-8">Erreur : {error.message}</p>
    );

  // Si aucune donnée
  if (Object.keys(groups).length === 0) {
    return (
      <p className="text-center mt-8">
        Aucune donnée disponible pour {countryName}.
      </p>
    );
  }

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-[#faf4ed]">
      <h2 className="text-3xl mb-6">Cost of living in {countryName}</h2>

      {Object.entries(groups).map(([category, items]) => (
        <section key={category} className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">{category}</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {items.map((inf, idx) => (
              <div
                key={`${category}-${inf.item_name}-${idx}`}
                className="p-4 bg-[#1a1a1a] rounded"
              >
                <h4 className="font-bold">{inf.item_name}</h4>
                <p>
                  <span className="font-semibold">{inf.average}</span>{" "}
                  <span className="">{inf.currency}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
