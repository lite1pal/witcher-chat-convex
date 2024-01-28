import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useRef, useState } from "react";

export default function Inn({ inn, pickedFellow }: any) {
  // convex queries
  const sayings = useQuery(api.sayings.getByInnId, { innId: inn._id });
  const createSaying = useMutation(api.sayings.createSaying);

  // react state
  const [input, setInput] = useState("");

  // react refs
  const innRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      innRef.current?.scrollTo({ top: innRef.current.scrollHeight });
    }, 500);
  }, [input]);

  return (
    <div className="flex flex-col gap-5 w-1/2 rounded-xl bg-stone-700 p-5">
      <div className="text-2xl">
        The inn you are in - <span className="text-rose-500">{inn.title}</span>
      </div>
      <div
        ref={innRef}
        className="border w-full overflow-y-scroll h-96 p-5 flex flex-col gap-3"
      >
        {sayings?.map((saying) => {
          return (
            <div className="flex flex-col p-2">
              <div className="text-xl text-indigo-300">{saying.fellowName}</div>
              <div className="pl-10">{saying.saying}</div>
            </div>
          );
        })}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Say your thing..."
        className="input input-bordered"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createSaying({
              saying: input,
              innId: inn._id,
              fellowId: pickedFellow._id,
              fellowName: pickedFellow.name,
            });
            setInput("");
          }
        }}
      />
    </div>
  );
}
