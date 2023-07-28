import { motion } from "framer-motion";
import { useEffect } from "react";

const shadowStyleOn = {
  color: " #fff",
  textShadow: `0 0 7px #fff,
                 0 0 12px #FF3131,
                 0 0 30px #FF3131`,
};

export const Credit = ({ setOpen, credit }) => {
  useEffect(() => {
    console.log("MI CREDITO: ", credit);
  }, []);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#25252590] flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10 p-2"
    >
      <article
        style={shadowStyleOn}
        className="bg-[#252525] flex items-center rounded-lg justify-center flex-col w-[500px] max-w-[500px] h-[350px] "
      >
        <h1 className="text-slate-100 text-center text-[1.5rem]">
          CREDITO ACTUAL
        </h1>
        <h2 className="text-center tracking-widest text-slate-100 text-[2.5rem]">
          {credit}
        </h2>
        <button
          type="button"
          onClick={() => setOpen((state) => ({ ...state, credit: false }))}
          className="border-slate-100 text-slate-100 w-[150px] border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2 transition-all hover:bg-slate-100 hover:text-slate-900"
        >
          SALIR
        </button>
      </article>
    </motion.section>
  );
};
