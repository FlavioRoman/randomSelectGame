const shadowStyleOn = {
  color: "#fff",
  textShadow: `0 0 7px #fff,
                 0 0 12px #4784F1,
                 0 0 30px #4784F1`,
};

const shadowStyleOff = {
  color: " #fff",
  textShadow: `0 0 7px #fff,
                 0 0 1px #4784F1,
                 0 0 1px #4784F1`,
};

export const Participate = ({ resetParticipate, reset }) => {
  return (
    <section className="bg-[#25252590] flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10 p-2">
      {/* <Confetti className="w-full h-full" /> */}
      <article
        style={shadowStyleOn}
        className="bg-[#252525]  flex items-center rounded-lg justify-center flex-col w-[500px] max-w-[500px] h-[300px]"
      >
        <h1 className="text-slate-100 text-center text-[2rem]">
          Desea participar por el primeo de
        </h1>
        <h1 className="text-slate-100 text-center text-[2rem]">100.000</h1>
        <button
          type="button"
          onClick={() => resetParticipate()}
          className="border-slate-100 text-slate-100 border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2 transition-all hover:bg-slate-100 hover:text-slate-900"
        >
          Participar
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="border-slate-100 text-slate-100 border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2 transition-all hover:bg-slate-100 hover:text-slate-900"
        >
          Cancelar
        </button>
      </article>
    </section>
  );
};
