import { useState } from "react";
import { square } from "./utils/data";
import { motion } from "framer-motion";
import { container, element } from "./utils/animation";
import Confetti from "react-confetti";
import "./App.css";
import { Credito } from "./components/modals/credito";

const shadowStyleOn = {
  color: " #fff",
  textShadow: `0 0 7px #fff,
               0 0 12px #FF3131,
               0 0 30px #FF3131`,
};

const shadowStyleOff = {
  color: " #fff",
  textShadow: `0 0 7px #fff,
               0 0 1px #FF3131,
               0 0 1px #FF3131`,
};

export const Modal = ({ reset, description }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#25252590] flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10 p-2"
    >
      <Confetti className="w-full h-full" />
      <article
        style={shadowStyleOn}
        className="bg-[#252525] border-2 border-[#FF3131] flex items-center rounded-lg justify-center flex-col w-[500px] max-w-[500px] h-[300px]"
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
    </motion.section>
  );
};

export const Square = ({ value, index, select }) => {
  return (
    <motion.div
      key={index}
      variants={element}
      onClick={() => select(index)}
      className={`${
        value.show ? `bg-neutral-950` : ``
      }  border-[#505050] drop-shadow-lg border-solid border-2 cursor-pointer flex justify-center items-center flex-wrap transition-all m-[2px] w-[90px] h-[90px]`}
    >
      <span
        className="text-[1.2rem]  text-center"
        style={value.show ? shadowStyleOn : shadowStyleOff}
      >
        BET BAR 360
      </span>
    </motion.div>
  );
};

function App() {
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(square);
  const [credit, setCredit] = useState(1000);
  const [winner, setWinner] = useState(false);
  const [description, setDescription] = useState({ name: null, img: null });

  const select = (index) => {
    const newArr = [...item];
    if (
      newArr[index].item == "🍸" ||
      newArr[index].item == "🥃" ||
      newArr[index].item == "🍺"
    ) {
      setWinner(true);
      setDescription({
        name: newArr[index].text,
        img: newArr[index].item,
      });
      newArr.map((value) => (value.show = false));
      setItem(newArr);
      setCredit((state) => state - 50);
      return "";
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
    setItem(item);
    setWinner(false);
    const newArr = [...item];
    newArr.map((value) => (value.show = true));
    setItem(newArr);
    setHide(false);
  };

  const random = () => {
    setItem(() => item.sort(() => 0.5 - Math.random()));
    setHide(true);
    console.log(item);
  };

  return (
    <main>
      {open && <Credito setOpen={setOpen} credit={credit} />}
      {winner && <Modal reset={reset} description={description} />}
      <motion.section initial="hidden" animate="visible" variants={container}>
        <h1 className="text-center font-light text-6xl text-white">
          Caza Fortunas
        </h1>
        <article className="flex flex-wrap justify-center sm:grid sm:grid-cols-5 mt-6 ">
          {item?.map((value, index) => (
            <Square key={index} index={index} value={value} select={select} />
          ))}
        </article>
        <button
          type="button"
          onClick={() => random()}
          className={`rounded-lg font-semibold block mx-auto transition-all mt-4 w-[180px] p-[12px] ${
            hide
              ? `bg-slate-100 text-slate-500 pointer-events-none`
              : `bg-slate-900 text-slate-100`
          }`}
        >
          MEZCLAR
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`rounded-lg font-semibold block mx-auto transition-all mt-4 w-[180px] p-[12px] bg-slate-900 text-slate-100`}
        >
          VER MI CREDITO
        </button>
      </motion.section>
    </main>
  );
}

export default App;
