"use client";

import { useState } from "react";
import Inn from "./components/inn";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const fellows = [
  "Yennefer",
  "Geralt",
  "Zoltan",
  "Dandelion",
  "Triss",
  "Ciri",
  "Lambert",
  "Eskel",
];

export default function Home() {
  // convex queries
  const inn = useQuery(api.inns.getInn);
  const fellows = useQuery(api.fellows.getAll);

  // react state
  const [pickedFellow, setPickedFellow] = useState();

  // functions
  const selectFellow = (fellow: any) => {
    console.log(fellow);
    setPickedFellow(fellow);
  };

  return (
    <main className="flex min-h-screen bg-stone-800 p-24 text-stone-200">
      <div className="flex flex-col gap-10 w-1/2">
        <h1 className="text-xl">
          Pick a fellow to step in a cozy flaked-with-travellers inn
        </h1>
        <div className="flex flex-wrap gap-5">
          {fellows?.map((fellow, i) => {
            return (
              <button
                type="button"
                className="px-3 hover:bg-white hover:text-stone-800 w-36 py-5 border text-center rounded-xl"
                key={i}
                onClick={() => selectFellow(fellow)}
                value={fellow.name}
              >
                {fellow.name}
              </button>
            );
          })}
        </div>
      </div>
      {pickedFellow && inn && <Inn pickedFellow={pickedFellow} inn={inn[0]} />}
    </main>
  );
}
