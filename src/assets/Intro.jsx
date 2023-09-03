import React from "react"


export default function Intro({toggleShow}) {
    return(
    <div className="intro-container">
        <h1 className ="title"> Quizzical</h1>
        <button className="start-btn" onClick={toggleShow}> Click Here To Begin </button>
        </div>
        
    )
    
}




