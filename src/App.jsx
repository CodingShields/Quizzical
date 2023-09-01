import { useState } from 'react'
import React from 'react';
import Intro from "./assets/Intro";
import Quiz from "./assets/Quiz";

function App() {
  const [showIntro, setShowIntro] = React.useState(true);

  function toggleShow() {
    setShowIntro(!showIntro);
    // console.log("Toggle Show Clicked")
  }

  function IntroComponent() {
    return (
      <div>
      <Intro />
      </div>
    )
  }

function QuizComponent() {
    return (
      <div>
      <Quiz />
      </div>
    )
  }

  return (
    <div>
         <div className="main-container">          
          {showIntro ? <IntroComponent toggleShow={toggleShow} /> : <QuizComponent toggleShow={toggleShow}  /> }
                
        </div>
    </div>
  )
}
export default App

