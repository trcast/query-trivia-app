import React, { useState, useEffect } from "react";
import Question from "./Question";

const QuestionList = ({ quizDataList, showResults }) => {
  const [answers, setAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0); // State for correct answers count

  useEffect(() => {
    // Reset correctAnswers when quizDataList changes
    setCorrectAnswers(0);
  }, [quizDataList]);

  // Function to handle user's answer
  const handleAnswer = (questionId, selectedOption, correctAnswer) => {
    const isCorrect = selectedOption === correctAnswer;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: isCorrect,
    }));

    // Calculate the number of correct answers and update the state
    const newCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;

    setCorrectAnswers(newCorrectAnswers); // Update correctAnswers count
  };

  return (
    <div>
      {quizDataList.map((quizDataItem) => {
        return (
          <Question
            question={quizDataItem.question}
            options={quizDataItem.options}
            answer={quizDataItem.answer}
            onAnswer={(selectedOption) =>
              handleAnswer(quizDataItem.id, selectedOption, quizDataItem.answer)
            }
            showResults={showResults}
            key={quizDataItem.id}
          />
        );
      })}
      {showResults && (
        <div className="flex flex-col justify-center items-center mt-8">
          <div className="w-96 flex flex-row justify-between items-center border-b border-black pb-4 mb-4">
            <p className="text-lg font-semibold">Your Score:</p>
            <div className="flex justify-center items-center px-4 py-1 border border-black rounded-full">
              {correctAnswers} / {quizDataList.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
