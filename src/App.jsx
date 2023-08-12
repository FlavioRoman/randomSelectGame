import { useEffect, useState } from "react";
import { square, square_ } from "./utils/data";
import Confetti from "react-confetti";
import "./App.css";
import BarCredit from "./components/Bar/barCredit";
import { useSpring, animated } from "@react-spring/web";
import { Participate } from "./components/modals/participate";
import { Credit } from "./components/modals/credit";
import { Lose } from "./components/modals/lose";
import Loading from "./components/animation/loading";

const shadowStyleOn = {
  color: "#fff",
  textShadow: `0 0 7px #fff,
               0 0 12px #47f1cc,
               0 0 30px #47f1cc`,
};

const shadowStyleOff = {
  color: " #fff",
  textShadow: `0 0 7px #fff,
               0 0 1px #4784F1,
               0 0 1px #4784F1`,
};

export const Modal = ({ description, resetAll, bigWinner }) => {
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
        <button
          type="button"
          onClick={() => resetAll(bigWinner)}
          className="border-slate-100 text-slate-100 border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2 transition-all hover:bg-slate-100 hover:text-slate-900"
        >
          Finalizar
        </button>
      </article>
    </section>
  );
};

export const Square = ({ index, value, select }) => {
  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <animated.div
      key={index}
      style={{ ...springs }}
      onClick={() => select(index)}
      className={`square ${
        value.show ? `bg-neutral-950` : `bg-neutral-950`
      } border-[#47f1cc] drop-shadow-lg border-solid  border-l-[3px] border-b-[3px] rounded-lg cursor-pointer flex justify-center items-center flex-wrap transition-all m-[2px] w-[90px] h-[90px]`}
    >
      <span className="text-[1.2rem] text-center" style={shadowStyleOn}>
        {value.show ? "BET BAR 360" : value.item}
      </span>
    </animated.div>
  );
};

function App() {
  const [sq, setSq] = useState();
  const [winner, setWinner] = useState();
  const [lose, setLose] = useState(false);
  const [credit, setCredit] = useState(500);
  const [bigWinner, setBigWinner] = useState(false);
  const [participate, setParticipate] = useState(false);
  const [animation, setAnimation] = useState(true);
  const [description, setDescription] = useState({
    item: "",
    title: "",
    description: "",
  });

  const selectSquare = (index) => {
    let newArr = bigWinner ? [...square_] : [...square];
    setSq(newArr);
    if (bigWinner) {
      if (newArr[index].item == "100.000") {
        for (let i = 0; i < newArr.length; i++) {
          newArr[i].show = false;
        }
        setSq(newArr);
        setTimeout(() => {
          setWinner(true);
          setDescription((state) => ({
            ...state,
            item: newArr[index].item,
            title: "FELICIDADES HAS GANADO!",
            description: "",
          }));
        }, 1500);
      } else {
        setCredit((state) => state - 100);
      }
    } else {
      if (
        newArr[index].item == "🍸" ||
        newArr[index].item == "🥃" ||
        newArr[index].item == "🍺"
      ) {
        for (let i = 0; i < newArr.length; i++) {
          newArr[i].show = false;
        }
        setSq(newArr);
        setTimeout(() => {
          setWinner(true);
          setDescription((state) => ({
            ...state,
            item: newArr[index].item,
            title: "FELICIDADES HAS GANADO!",
            description: "",
          }));
        }, 1500);
      } else {
        for (let i = 0; i < newArr.length; i++) {
          newArr[i].show = false;
        }
        setSq(newArr);
        setTimeout(() => {
          setLose(true);
        }, 1500);
      }
    }

    // ::::::REINICIAR LOS SQUARES::::::
    if (credit == 100) {
      for (let i = 0; i < newArr.length; i++) {
        newArr[i].show = true;
      }
    }
  };

  const resetParticipate = () => {
    let newArr = bigWinner ? [...square_] : [...square];
    setCredit(500);
    setWinner(false);
    setBigWinner(true);
    setParticipate(false);
    setDescription({
      item: "",
      title: "",
      description: "",
    });
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].show = true;
    }
    setSq(newArr);
  };

  const reset = () => {
    setCredit(500);
    setWinner(false);
    setBigWinner(false);
    setParticipate(false);
    setDescription({
      item: "",
      title: "",
      description: "",
    });
  };

  const resetAll = (bigWinner) => {
    let newArr = bigWinner ? [...square_] : [...square];
    setCredit(500);
    setLose(false);
    setWinner(false);
    setBigWinner(false);
    setParticipate(true);
    if (bigWinner) {
      setParticipate(false);
    }
    setDescription({
      item: "",
      title: "",
      description: "",
    });
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].show = true;
    }
    setSq(newArr);
  };

  const resetInitial = () => {
    let newArr = bigWinner ? [...square_] : [...square];
    setCredit(500);
    setLose(false);
    setWinner(false);
    setBigWinner(false);
    setDescription({
      item: "",
      title: "",
      description: "",
    });
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].show = true;
    }
    setSq(newArr);
  };

  useEffect(() => {
    setSq(square);
    setTimeout(() => {
      setAnimation(false);
    }, 3000);
  }, []);

  return (
    <>
      {/* {animation && <Loading />} */}
      {bigWinner && <BarCredit credit={credit} />}
      {credit == 0 ? <Credit resetAll={resetAll} bigWinner={bigWinner} /> : ""}
      <main>
        {/* <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div> */}
        {/* ::::::BAR:::::: */}
        {open.lose == false ? <BarCredit credit={credit} /> : ""}
        <section className="pt-16">
          <article className="flex flex-wrap justify-center sm:grid sm:grid-cols-5 mt-6 ">
            {sq?.map((value, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  value={value}
                  winner={winner}
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
          resetAll={resetAll}
          bigWinner={bigWinner}
          description={description}
          participate={participate}
        />
      )}
      {participate && (
        <Participate
          reset={reset}
          setParticipate={setParticipate}
          resetParticipate={resetParticipate}
        />
      )}
      {lose && <Lose resetAll={resetInitial} />}
    </>
  );
}

export default App;
