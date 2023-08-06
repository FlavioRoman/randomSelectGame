import { useSpring, animated } from "@react-spring/web";

const BarCredit = ({ credit }) => {
  const springs = useSpring({
    from: { y: 0, opacity: 0 },
    to: { y: 10, opacity: 1 },
  });
  return (
    <animated.div
      style={{ ...springs }}
      className="fixed top-[10px] left-0 right-0 m-auto rounded-lg w-[100%] max-w-[300px] h-[50px] bg-slate-900 p-2 z-30"
    >
      <p className="text-white text-center text-2xl">Credito: {credit}</p>
    </animated.div>
  );
};

export default BarCredit;
