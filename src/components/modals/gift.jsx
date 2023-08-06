const shadowStyleOn = {
  color: " #fff",
  textShadow: `0 0 7px #fff,
                   0 0 12px #FF3131,
                   0 0 30px #FF3131`,
};

export const Gift = ({ setCredit, setOpen, reset }) => {
  const startAgain = () => {
    reset();
    setCredit(300);
    setOpen((state) => ({ ...state, finish: false }));
  };
  const exit = () => {
    reset();
    setCredit(300);
    setOpen((state) => ({ ...state, finish: false }));
  };
  return (
    <section className="bg-[#25252590] flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10 p-2">
      <article
        style={shadowStyleOn}
        className="bg-[#252525] flex items-center rounded-lg justify-center flex-col w-[500px] max-w-[500px] h-[350px] "
      >
        <h1 className="text-slate-100 text-center text-[1.5rem]">
          Deseas jugar por el premio de 100.000
        </h1>
        <button
          type="button"
          onClick={() => startAgain()}
          className="border-slate-100 text-slate-100 w-[150px] border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2 transition-all hover:bg-slate-100 hover:text-slate-900"
        >
          Participar
        </button>
        <button
          type="button"
          onClick={() => exit()}
          className="border-slate-100 text-slate-100 w-[150px] border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2 transition-all hover:bg-slate-100 hover:text-slate-900"
        >
          SALIR
        </button>
      </article>
    </section>
  );
};
