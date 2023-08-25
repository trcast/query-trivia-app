import "./App.css";
import QuizComp from "./components/QuizComp";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="flex flex-col p-4 justify-start items-center w-full h-screen">
        <NavBar />
        <div className="md:w-[80%]">
          <QuizComp />
        </div>
      </div>
    </>
  );
}

export default App;
