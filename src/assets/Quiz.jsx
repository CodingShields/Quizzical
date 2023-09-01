import React, { useState, useEffect } from "react"
import { encode } from 'html-entities'
import { nanoid } from "nanoid"

export default function Quiz() {
    const [allData, SetAllData] = useState([])

    const [newQuiz, NewQuiz] = useState(false)
    
    useEffect(() => {
        async function getData() {
            const res = await fetch("https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple")
            const data = await res.json()
            const updatedQuestions = data.results.map((question) => ({
                id:nanoid(),
                question: question.question, 
                correct_answer: question.correct_answer,
                all_answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5),
                isHeld: false,
                
            
            }))
            SetAllData(updatedQuestions)
            console.log(allData)
            console.log("All Data Logged")
        }
        getData()
    }, [])

function handleChange(id) {
    SetAllData(oldData => oldData.map(data => {
        return data.id === id ?
             { ...data, isHeld: !data.isHeld }
            : data
    }))
    console.log("clicked");
}

    function checkAnswers() {
        console.log("clicked")
    }


    return (
        <div className="quiz-container">
            {allData.slice(0,5).map((questionItem, index) => (
                <div key={index}>
                    <p>{questionItem.question}</p>
                    <div className="answer-container">
                        
                {questionItem.all_answers.map((answerItem, answerIndex) => (
                        <div key={answerIndex} >
                        <button
                            key={answerItem.id}
                            type="radio"
                            className="answer-btn"
                            onClick={() => handleChange(questionItem.id, answerItem.id)}
                            style={
                                questionItem.isHeld
                                    ? { backgroundColor: 'grey' }
                                    : { backgroundColor: 'white' }}
                        >{answerItem}</button>
                    </div>
                ))}
                    </div>
                </div>
            ))}
        <button className="check-answer-btn" onClick={checkAnswers}> Check Answers </button>
        </div>
    
    )
}
