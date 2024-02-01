"use client";

import { useEffect, useState } from "react";
import Inn from "./components/inn";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { unpickFellow } from "../../convex/fellows";

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
  const pickFellow = useMutation(api.fellows.pickFellow);
  const unpickFellow = useMutation(api.fellows.unpickFellow);

  // react state
  const [pickedFellow, setPickedFellow] = useState<any>();

  // functions
  const selectFellow = (fellow: any) => {
    // pickFellow({ fellowId: fellow._id });
    if (!fellow.picked) {
      setPickedFellow(fellow);
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center bg-slate-800 p-24 text-violet-400">
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl text-center sm:text-4xl">
          Pick a fellow to step in a cozy flaked-with-travellers inn
        </h1>
        <div className="flex flex-wrap gap-5 items-center justify-center">
          {fellows?.map((fellow, i) => {
            return (
              <button
                type="button"
                className="text-xl text-white group transition duration-400 w-36 py-5 text-center rounded-xl"
                key={i}
                onClick={() => selectFellow(fellow)}
                value={fellow.name}
              >
                {fellow.name}
                <span
                  className={`${
                    pickedFellow && pickedFellow.name === fellow.name
                      ? "max-w-full"
                      : "max-w-0"
                  } block h-0.5 bg-violet-400 transition-all duration-300 group-hover:max-w-full`}
                ></span>
              </button>
            );
          })}
        </div>
      </div>
      {pickedFellow && inn && <Inn pickedFellow={pickedFellow} inn={inn[0]} />}
    </main>
  );
}
