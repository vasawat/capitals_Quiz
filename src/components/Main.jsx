import { useEffect, useState } from "react";
import "./Main.css";
export default function Main() {
  const [inputCountry, setInputCountry] = useState();
  const [count, setCount] = useState(0);
  const [backendData, setBackendData] = useState([{}]);
  const [question, setQuestion] = useState({});
  const [showAnswer,setShowAnswer] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // "http://localhost:5000/api"
          "https://capitals-quiz-backend.onrender.com/api"
        );
        const data = await response.json();
        setBackendData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (backendData && backendData.length > 0) {
      let random = Math.floor(Math.random() * backendData.length);
      const newQuestion = backendData[random];
      setQuestion(newQuestion);
    } else {
      console.log("don't have data");
    }
  }, [backendData]);

  function checkAnswer(e) {
    e.preventDefault();
    if (inputCountry.toLowerCase() === question.name.toLowerCase()) {
      let random = Math.floor(Math.random() * backendData.length);
      const newQuestion = backendData[random];
      setQuestion(newQuestion);
      setCount((count) => count + 1);
    } else {
      console.log("you Wrong !!!");
      setCount(0);
    }
  }

  return (
    <div className="wrap">
      <div className="mainBox">
        <p className="textHead">Country Quiz</p>
        <div className="flagBox">
          <img className="flag" src={question.flag} alt="" />
          <div className="answerBox">
            <button className="btn " onClick={()=>setShowAnswer(!showAnswer)}>Answer</button>
            {showAnswer ? <p className="answer">answer = {question.name}</p>:<></>}
          </div>
        </div>
        <form onSubmit={checkAnswer}>
          <input
            className="input"
            onChange={(e) => setInputCountry(e.target.value)}
            id="inputCountry"
            type="text"
            placeholder="Guess some country"
          />
          <button className="btn" type="submit">
            Guess
          </button>
        </form>
      </div>
      <div className="pointBox">
        <span>Point : {count}</span>
      </div>
    </div>
  );
}
