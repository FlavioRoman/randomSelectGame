const shadowStyleOn = {
  color: " #fff",
  textShadow: `0 0 7px #fff,
                 0 0 12px #FF3131,
                 0 0 30px #FF3131`,
};

export const Lose = ({ setOpen, credit, setCredit, reset }) => {
  // ::::::FUNCION PROBAR DE NUEVO::::::
  const tryAgain = () => {
    reset();
    if (!open.finish) setCredit((state) => state - 100);
    setOpen((state) => ({ ...state, lose: false }));
  };
  // ::::::FUNCION CANCELAR::::::
  const cancel = () => {
    reset();
    setCredit(300);
    setOpen((state) => ({ ...state, lose: false }));
  };

  return (
    <section className="bg-[#25252590] flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10 p-2">
      <article
        style={shadowStyleOn}
        className="bg-[#252525] flex items-center rounded-lg justify-center flex-col w-[500px] max-w-[500px] h-[350px] "
      >
        <h1 className="text-slate-100 text-center text-[1.8rem]">
          Mejor suerte la proxima
        </h1>
        <h2 className="text-center  text-[60px]">❌</h2>
        <h2 className="text-center tracking-widest text-slate-100 text-[1.5rem]">
          Credito: {credit}
        </h2>
        <button
          type="button"
          onClick={() => tryAgain()}
          className="border-slate-100 text-slate-100 border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2 transition-all hover:bg-slate-100 hover:text-slate-900"
        >
          PROBAR DE NUEVO
        </button>
        <button
          type="button"
          onClick={() => cancel()}
          className="border-slate-100 text-slate-100 border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2 transition-all hover:bg-slate-100 hover:text-slate-900"
        >
          CANCELAR
        </button>
      </article>
    </section>
  );
};
