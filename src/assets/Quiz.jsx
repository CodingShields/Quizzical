import React, { useState, useEffect } from "react";
import { encode } from "html-entities";
import { nanoid } from "nanoid";

export default function Quiz() {
  const [allData, SetAllData] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple"
      );
      const data = await res.json();
      const updatedQuestions = data.results.map((question) => ({
        id: nanoid(),
        question: question.question,
        correct_answer: question.correct_answer,
        all_answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5),
        selectedAnswer: null,
        isCorrect: false, // Add a property to track if the user's answer is correct
        isNotSelected: false,
        isSelected:false,
      }));
      SetAllData(updatedQuestions);
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
  }

  function checkAnswers() {
    SetAllData((oldData) =>
      oldData.map((question) => {
        const isCorrectAnswer =
          question.selectedAnswer === question.correct_answer;

        return {
          ...question,
            isCorrect: isCorrectAnswer,
            isIncorrect:false,
        };
      })
    );
  }

  return (
    <div className="quiz-container">
      {allData.slice(0, 5).map((questionItem, questionIndex) => (
        <div key={questionIndex}>
          <p>{questionItem.question}</p>
          <div className="answer-container">
            {questionItem.all_answers.map((answerItem, answerIndex) => (
              <div key={answerIndex}>
                <button
                  type="radio"
                  className="answer-btn"
                  onClick={() => {
                    handleChange(questionItem.id, answerItem);
                  }}
                  style={{
                    backgroundColor:
                      questionItem.selectedAnswer === answerItem ? "#fae588" : questionItem.isCorrect === true ? "#007f5f"  : "#ffffff", 
                  }}
                >
                  {answerItem}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="check-answer-btn" onClick={checkAnswers}>
        Check Answers
      </button>
    </div>
  );
}
