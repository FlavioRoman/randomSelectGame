import { useEffect, useState } from "react";
import { square, square_ } from "./utils/data";
import Confetti from "react-confetti";
import "./App.css";
import { Lose } from "./components/modals/lose";
import { Finish } from "./components/modals/finish";
import BarCredit from "./components/Bar/barCredit";
import { useSpring, animated } from "@react-spring/web";
import { Participate } from "./components/modals/participate";
import { Credit } from "./components/modals/credit";

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

export const Modal = ({
  reset,
  bigWinner,
  resetSquare,
  description,
  resetAll,
}) => {
  return (
    <section className="bg-[#25252590] flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10 p-2">
      <Confetti className="w-full h-full" />
      <article
        style={shadowStyleOn}
        className="bg-[#252525]  flex items-center rounded-lg justify-center flex-col w-[500px] max-w-[500px] h-[300px]"
      >
        <h1 className="text-slate-100 text-center text-[1.5rem]">
          {description.title}
        </h1>
        <h2 className="text-center  text-[80px]">{description.item}</h2>
        <h2 className="text-center text-slate-100 text-[1.5rem]">
          {description.description}
        </h2>
        {bigWinner ? (
          ""
        ) : (
          <button
            type="button"
            onClick={() => resetSquare()}
            className="border-slate-100 text-slate-100 border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2 transition-all hover:bg-slate-100 hover:text-slate-900"
          >
            Reiniciar
          </button>
        )}

        <button
          type="button"
          onClick={() => resetAll()}
          className="border-slate-100 text-slate-100 border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2 transition-all hover:bg-slate-100 hover:text-slate-900"
        >
          Finalizar
        </button>
      </article>
    </section>
  );
};

export const Square = ({ winner, value, index, select }) => {
  console.log(winner);
  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <animated.div
      key={index}
      style={{ ...springs }}
      onClick={() => select(index)}
      className={`${
        value.show ? `bg-neutral-950` : ``
      }  border-[#505050] drop-shadow-lg border-solid border-2 rounded-lg cursor-pointer flex justify-center items-center flex-wrap transition-all m-[2px] w-[90px] h-[90px]`}
    >
      <span
        className="text-[1.2rem]  text-center"
        style={value.show ? shadowStyleOn : shadowStyleOff}
      >
        {winner ? value.item : "BET BAR 360"}
      </span>
    </animated.div>
  );
};

function App() {
  const [credit, setCredit] = useState(300);
  const [winner, setWinner] = useState(false);
  const [item01, setItem01] = useState(square);
  const [item02, setItem02] = useState(square_);
  const [bigWinner, setBigWinner] = useState(false);
  const [participate, setParticipate] = useState(false);
  const [description, setDescription] = useState({
    item: "",
    title: "",
    description: "",
  });

  const selectSquare = (index) => {
    const newArr = bigWinner ? [...item02] : [...item01];
    if (bigWinner) {
      if (newArr[index].item == "100.000") {
        setWinner(true);
        setDescription((state) => ({
          ...state,
          item: newArr[index].item,
          title: "FELICIDADES HAS GANADO!",
          description: "",
        }));
      } else {
        setCredit((state) => state - 100);
      }
    } else {
      if (
        newArr[index].item == "🍸" ||
        newArr[index].item == "🥃" ||
        newArr[index].item == "🍺"
      ) {
        setWinner(true);
        setDescription((state) => ({
          ...state,
          item: newArr[index].item,
          title: "FELICIDADES HAS GANADO!",
          description: "",
        }));
      } else {
        setCredit((state) => state - 100);
      }
    }
  };

  const resetSquare = () => {
    setWinner(false);
    setDescription({
      item: "",
      title: "",
      description: "",
    });
    setParticipate(true);
  };

  const resetParticipate = () => {
    setWinner(false);
    setParticipate(false);
    setDescription({
      item: "",
      title: "",
      description: "",
    });
  };

  const reset = () => {
    setWinner(false);
    setDescription({
      item: "",
      title: "",
      description: "",
    });
  };

  const resetAll = () => {
    setWinner(false);
    setBigWinner(false);
    setParticipate(false);
    setCredit(300);
    setDescription({
      item: "",
      title: "",
      description: "",
    });
  };

  return (
    <>
      <BarCredit credit={credit} />
      {credit == 0 ? <Credit resetAll={resetAll} /> : ""}
      <main>
        {/* ::::::BAR:::::: */}
        {open.lose == false ? <BarCredit credit={credit} /> : ""}
        <section className="pt-16">
          <h1 className="text-center font-light text-6xl text-white">
            Caza Fortunas
          </h1>
          <article className="flex flex-wrap justify-center sm:grid sm:grid-cols-5 mt-6 ">
            {item01.map((value, index) => {
              return (
                <Square
                  winner={winner}
                  key={index}
                  index={index}
                  value={value}
                  select={selectSquare}
                />
              );
            })}
          </article>
        </section>
      </main>
      {winner && (
        <Modal
          reset={reset}
          bigWinner={bigWinner}
          resetAll={resetAll}
          resetSquare={resetSquare}
          description={description}
          participate={participate}
        />
      )}
      {participate && (
        <Participate
          resetAll={resetAll}
          reset={resetSquare}
          setBigWinner={setBigWinner}
          setParticipate={setParticipate}
          resetParticipate={resetParticipate}
        />
      )}
    </>
  );
}

export default App;
