import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Inn({ inn, pickedFellow }: any) {
  // convex queries
  const sayings = useQuery(api.sayings.getByInnId, { innId: inn._id });
  const createSaying = useMutation(api.sayings.createSaying);

  // react state
  const [input, setInput] = useState("");

  // react refs
  const innRef: any = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      innRef.current?.scrollTo({ top: innRef.current.scrollHeight });
    }, 500);
  }, [sayings]);

  return (
    <div className="flex flex-col gap-5 w-screen md:w-full rounded-xl p-5">
      <div
        ref={innRef}
        className="overflow-y-scroll h-80 p-5 flex flex-col gap-3"
      >
        {sayings?.map((saying) => {
          return (
            <div
              key={saying._id}
              className={`chat ${
                pickedFellow.name === saying.fellowName
                  ? "chat-end"
                  : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={saying.fellowImg}
                  />
                </div>
              </div>
              <div className="chat-header flex gap-2 items-center">
                {saying.fellowName}
                <time className="text-xs opacity-50">
                  {new Date(saying._creationTime).toLocaleTimeString()}
                </time>
              </div>
              <div className="chat-bubble">{saying.saying}</div>
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
              fellowImg: pickedFellow.img,
            });
            setInput("");
          }
        }}
      />
    </div>
  );
}
