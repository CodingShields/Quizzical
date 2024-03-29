import React, { useState, useEffect } from "react";
import { encode } from "html-entities";
import { nanoid } from "nanoid";
import checkmark from "./checkmark.svg"

export default function Quiz() {
  const [allData, SetAllData] = useState([]);
  const [score, setScore] = useState(null)
  

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple"
      );
      const data = await res.json();
      const updatedQuestions = data.results.slice(0, 5).map((question) => ({
        id: nanoid(),
        question: question.question,
        correct_answer: question.correct_answer,
        all_answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5),
        selectedAnswer: null,
        isCorrect: null,

    }));

      SetAllData(updatedQuestions);
      console.log(allData);
    }
    getData();
  }, []);

  function handleChange(questionId, answerItem) {
    SetAllData((oldData) =>
      oldData.map((question) => {
        if (question.id === questionId) {
          // Toggle selection for the clicked answer
          const updatedSelectedAnswer =
            question.selectedAnswer === answerItem ? null : answerItem;
        
          
          const updatedQuestion = {
            ...question,
            selectedAnswer: updatedSelectedAnswer,

          };
          return updatedQuestion;
        }
        
        return question;
      })
      
    );
    console.log(allData)
  }

  function checkAnswers() {
    SetAllData((oldData) =>
      oldData.map((question) => {

        const isCorrectAnswer =
          question.selectedAnswer === question.correct_answer;
        return {
          ...question,
          isCorrect: isCorrectAnswer,
        };
      })
      
    );
    getScore()
    console.log(allData);
  }

  function getScore() {
    const quizScore = allData.filter(
      (item) => item.correct_answer === item.selectedAnswer
    );
    const count = quizScore.length;
    setScore(`You scored ${count} out of 5`); // Set the score in the state
  }

  return (
    <div className="quiz-container">
      {allData.map((questionItem, questionIndex) => (
        <div key={questionIndex}>
          <p>{questionItem.question}</p>
          <div className="answer-container">
            {questionItem.all_answers.map((answerItem, answerIndex) => (
              <div key={answerIndex}>
                <div
                  
                  className="answer-btn"
                  onClick={() => {
                    handleChange(questionItem.id, answerItem);
                  }
                }
                 style={{
                    backgroundColor: 
                      questionItem.isCorrect === null ? 
                      (questionItem.selectedAnswer === answerItem ? "#fae588" : "#ffffff") :
                      (questionItem.selectedAnswer === answerItem ? (questionItem.isCorrect ? null  : "#d90429") : "#ffffff"),
                        }} > {answerItem} </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="check-answer-btn" onClick={checkAnswers}> Check Answers </button>
      <div className="score-card">
        <h2 className="score">{score !== null ? score : ""}</h2>
      </div>
    </div>
  );
}
