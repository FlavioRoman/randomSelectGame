import { useState } from "react";
import { square } from "./utils/data";
import { motion } from "framer-motion";
import { container, element } from "./utils/animation";
import "./App.css";

export const Modal = ({ reset }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#25252590] flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 w-full h-full p-2 z-10"
    >
      <article className="bg-[#252525] flex items-center rounded-lg justify-center flex-col w-[500px] max-w-[500px] h-[300px]">
        <h1 className="text-slate-100 text-center text-[1.5rem]">
          Felicidades a ganado!
        </h1>
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
        value.show ? `bg-gray-900` : ``
      } border-[#252525] drop-shadow-lg border-solid border-2 cursor-pointer flex justify-center items-center flex-wrap transition-all m-[2px] w-[70px] h-[70px]`}
    >
      <span>{value.show ? "" : value.item}</span>
    </motion.div>
  );
};

function App() {
  const [item, setItem] = useState(square);
  const [winner, setWinner] = useState(false);

  const select = (index) => {
    const newArr = [...item];
    if (newArr[index].item == "📀") {
      setWinner(true);
      newArr.map((value) => (value.show = false));
      setItem(newArr);
      return "";
    }
    newArr[index].show = false;
    setItem(newArr);
  };

  const reset = () => {
    setItem(item);
    setWinner(false);
    const newArr = [...item];
    newArr.map((value) => (value.show = true));
    setItem(newArr);
  };

  const random = () => {
    setItem(() => item.sort(() => 0.5 - Math.random()));
    console.log(item);
  };

  return (
    <main>
      {winner && <Modal reset={reset} />}
      <motion.section initial="hidden" animate="visible" variants={container}>
        <h1 className="text-center font-bold text-4xl">RANDOM SELECT</h1>
        <article className="grid grid-cols-5 mt-6">
          {item?.map((value, index) => (
            <Square key={index} index={index} value={value} select={select} />
          ))}
        </article>
        <button
          type="button"
          onClick={() => random()}
          className="border-[#252525] border-solid border-2 rounded-lg font-semibold block mx-auto mt-4 p-2"
        >
          MEZCLAR
        </button>
      </motion.section>
    </main>
  );
}

export default App;
