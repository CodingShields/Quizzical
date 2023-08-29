import React from "react"
import Question from "./question"
import { encode } from 'html-entities'
import {nanoid} from "nanoid"

export default function Quiz() {

    const [allQuestions, SetAllQuestions] = React.useState([])

    React.useEffect(() => {
        async function getQuiz() {
            const res = await fetch("https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple")
            const data = await res.json()
            SetAllQuestions(data.results)
}
getQuiz()
    }, [])
    
    function generateQuestion() {
        return {
            value: allQuestions.question,
            id:nanoid()
        }
    }

    function newQuestion() {
        const newQuiz = []
        for (let i = 0; i < 4; i++){
            newQuiz.push(generateQuestion())
        }
        return newQuiz
    }
    const questionElements = allQuestions.map(quiz =>(
        <div>
        <Question
            key={quiz.id}
                value={quiz.value} />
            </div>
    ))

    return (
        <div>
            {questionElements}
        </div>
    
    )
}