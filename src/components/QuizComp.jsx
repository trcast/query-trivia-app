import { useState } from "react";
import axios from "axios";
import QuestionList from "./QuestionList";
import { BsSliders, BsXSquare, BsPuzzle } from "react-icons/bs";

const triviaCategories = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

function QuizComp() {
  const button =
    "border border-black px-12 py-1 rounded-full w-fit my-4 hover:bg-black hover:text-white transition-all ease-in-out mb-12";

  const [showResults, setShowResults] = useState(false);
  const [quizDataList, setQuizDataList] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium"); // Default difficulty
  const [selectedCategory, setSelectedCategory] = useState(""); // Default category

  const fetchQuizData = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const apiUrl = `https://opentdb.com/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;

    axios.get(apiUrl).then((res) => {
      setQuizDataList(
        res.data.results.map((questionItem, index) => {
          const decodedQuestion = decodeString(questionItem.question);
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map(decodeString),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodedQuestion,
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
      setShowResults(false); // Reset showResults
      setQuizStarted(true);
      setUserScore(0); // Reset userScore to 0
    });
  };

  const showAnswerResults = () => {
    setShowResults(true);
  };

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <>
      <div className="py-4 flex flex-col justify-start items-center h-screen">
        {/* Options Start */}
        <div className="flex flex-col items-center justify-center">
          {quizStarted ? (
            showResults ? (
              <div className="flex flex-col justify-start items-center w-full">
                <QuestionList
                  quizDataList={quizDataList}
                  showResults={showResults}
                  userScore={userScore}
                />
                <div className="flex flex-col justify-center items-start w-full mb-4 px-8">
                  <div className="flex flex-row justify-between items-center w-full">
                    <h2 className="text-lg font-semibold mb-2">
                      Change Category
                    </h2>
                    <BsPuzzle />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-black p-2 rounded-md"
                  >
                    {triviaCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col justify-start mb-4 w-full px-8">
                  <div className="flex flex-row justify-between items-center w-full">
                    <h2 className="text-lg font-semibold mb-2">
                      Change Difficulty
                    </h2>
                    <BsSliders size={18} />
                  </div>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full border border-black p-2 rounded-md"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <button className={button} onClick={fetchQuizData}>
                  Play Again
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-start items-center w-full">
                <QuestionList
                  quizDataList={quizDataList}
                  showResults={showResults}
                  userScore={userScore}
                />
                <button className={button} onClick={showAnswerResults}>
                  Check Answers
                </button>
              </div>
            )
          ) : (
            // Start Screen
            <div className="flex flex-col justify-start items-center w-full md:w-[38rem] mt-4 bg-white border border-black shadow-box pb-4">
              <div className="w-full h-8 border-b border-black mb-8 flex flex-row justify-end items-center px-4">
                <BsXSquare />
              </div>
              <div className="flex flex-col justify-center items-start w-full px-8 mb-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <h2 className="text-lg font-semibold mb-2">
                    Select Category
                  </h2>
                  <BsPuzzle />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-black p-2 rounded-md"
                >
                  {triviaCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-center items-start w-full mb-4 px-8">
                <div className="flex flex-row justify-between items-center w-full">
                  <h2 className="text-lg font-semibold mb-2">
                    Select Difficulty
                  </h2>
                  <BsSliders size={18} />
                </div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full border border-black p-2 rounded-md"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button className={button} onClick={fetchQuizData}>
                Start Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default QuizComp;
