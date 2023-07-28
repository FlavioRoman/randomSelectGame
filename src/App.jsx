import { useEffect, useState } from "react";
import { square } from "./utils/data";
import Confetti from "react-confetti";
import "./App.css";
import { Lose } from "./components/modals/lose";
import { Finish } from "./components/modals/finish";
import BarCredit from "./components/Bar/barCredit";
import { useSpring, animated } from "@react-spring/web";

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

export const Modal = ({ reset, description }) => {
  return (
    <section className="bg-[#25252590] flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10 p-2">
      <Confetti className="w-full h-full" />
      <article
        style={shadowStyleOn}
        className="bg-[#252525]  flex items-center rounded-lg justify-center flex-col w-[500px] max-w-[500px] h-[300px]"
      >
        <h1 className="text-slate-100 text-center text-[1.5rem]">
          FELICIDADES HAS GANADO!
        </h1>
        <h2 className="text-center  text-[80px]">{description.img}</h2>
        <h2 className="text-center text-slate-100 text-[1.5rem]">
          {description.name}
        </h2>
        <button
          type="button"
          onClick={() => reset()}
          className="border-slate-100 text-slate-100 border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2 transition-all hover:bg-slate-100 hover:text-slate-900"
        >
          REINICIAR
        </button>
      </article>
    </section>
  );
};

export const Square = ({ value, index, select }) => {
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
        BET BAR 360
      </span>
    </animated.div>
  );
};

function App() {
  const [open, setOpen] = useState({
    lose: false,
    again: false,
    winner: false,
    credit: false,
    finish: false,
  });
  const [hide, setHide] = useState(false);
  const [item, setItem] = useState(square);
  const [credit, setCredit] = useState(300);
  const [description, setDescription] = useState({ name: null, img: null });

  const select = (index) => {
    const newArr = [...item];
    if (
      newArr[index].item == "🍸" ||
      newArr[index].item == "🥃" ||
      newArr[index].item == "🍺"
    ) {
      setOpen((state) => ({ ...state, winner: true }));
      setCredit(300);
      setDescription({
        name: newArr[index].text,
        img: newArr[index].item,
      });
      newArr.map((value) => (value.show = false));
      setItem(newArr);
      return "";
    } else {
      setOpen((state) => ({ ...state, lose: true }));
    }
    newArr[index].show = false;
    setItem(newArr);
    setHide(check(newArr));
  };

  const check = (arr) => {
    return arr.some((value) => {
      return value.show == false;
    });
  };

  const reset = () => {
    random();
    setItem(item);
    setOpen((state) => ({ ...state, winner: false }));
    const newArr = [...item];
    newArr.map((value) => (value.show = true));
    setItem(newArr);
    setHide(false);
  };

  const random = () => {
    setItem(() => item.sort(() => 0.5 - Math.random()));
    setHide(true);
  };

  // ::::::HOOK useEffect::::::
  useEffect(() => {
    random();
    if (credit <= 0) {
      setOpen((state) => ({ ...state, lose: false, finish: true }));
    }
  }, [open.credit, open.lose]);

  return (
    <main>
      {/* ::::::BAR:::::: */}
      {open.lose == false ? <BarCredit credit={credit} /> : ""}
      <section className="pt-16">
        <h1 className="text-center font-light text-6xl text-white">
          Caza Fortunas
        </h1>
        <article className="flex flex-wrap justify-center sm:grid sm:grid-cols-5 mt-6 ">
          {item?.map((value, index) => (
            <Square key={index} index={index} value={value} select={select} />
          ))}
        </article>
      </section>
      {/* ::::::MODALS:::::: */}
      {open.lose && (
        <Lose
          open={open}
          reset={reset}
          credit={credit}
          setOpen={setOpen}
          setCredit={setCredit}
        />
      )}
      {open.finish && (
        <Finish setCredit={setCredit} setOpen={setOpen} reset={reset} />
      )}
      {open.winner && <Modal reset={reset} description={description} />}
    </main>
  );
}

export default App;
