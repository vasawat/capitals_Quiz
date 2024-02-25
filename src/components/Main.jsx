import { useEffect, useState } from "react";
import "./Main.css";
export default function Main() {
  const [inputCountry, setInputCountry] = useState();
  const [count, setCount] = useState(0);
  const [backendData, setBackendData] = useState([{}]);
  const [question, setQuestion] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api");
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
        <p className="textHead">Capitals Quiz</p>
        <span>{question.flag}</span>
        <p>answer = {question.name}</p>
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
