import React, { useState } from "react";
// import Info from "../components/Info";

const CounterPage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="counter">
      <button
        onClick={() => {
          setCounter(counter - 1);
        }}
      >
        -
      </button>
      <p>Counter: {counter}</p>
      <button
        onClick={() => {
          // Counter = 0
          setCounter(counter + 1);
          // Counter = 1
          console.log(counter);
        }}
      >
        +
      </button>
    </div>
  );
};

export default CounterPage;

// const createCounter = () => {
//   let value = 0;

//   function changeProperty(newValue) {
//     value = newValue;
//   }

//   return [value, changeProperty];
// };

// const [counter, setCounter] = createCounter();

// console.log(counter); // 0
// setCounter(1);
// console.log(counter); // 1
