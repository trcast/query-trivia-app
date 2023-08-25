import React, { useState, useEffect } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import dots from "../assets/dots.png";

const Question = ({ question, options, answer, onAnswer, showResults }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    if (userAnswer !== null) {
      setSelectedOption(userAnswer);
    } else {
      setSelectedOption("");
    }
  }, [userAnswer]);

  const handleOptionClick = (option) => {
    if (!showResults) {
      setSelectedOption(option);
      onAnswer(option);
      setUserAnswer(option);
    }
  };

  return (
    <div className="flex flex-col justify-start items-end">
      <header className="relative flex flex-row justify-start items-center p-4 md:w-[36rem] w-11/12 border border-black z-20 bg-white">
        <div className="absolute -inset-4 w-8 h-8 border border-black flex justify-center items-center bg-white">
          <BsQuestionCircleFill size={20} />
        </div>
        <h3 className="text-xl font-semibold">{question}</h3>
      </header>

      {/* Options */}
      <div className="flex flex-col w-3/4 py-4 px-8 justify-start items-start mb-12 border border-black mt-4 shadow-box bg-white z-20">
        {options.map((option) => (
          <button
            key={option}
            className={`option ${
              selectedOption === option && !showResults
                ? "selected"
                : selectedOption === option && showResults && option === answer
                ? "selected-correct"
                : selectedOption === option && showResults && option !== answer
                ? "selected-incorrect"
                : showResults && option === answer
                ? "correct"
                : ""
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={showResults}
          >
            {option}
          </button>
        ))}
      </div>
      <img src={dots} className="absolute z-10 w-[27.6rem] md:w-[32rem]" />
    </div>
  );
};

export default Question;
