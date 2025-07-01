import React from 'react';
import { Action } from "../App";

interface StartScreenProps {
  numQuestions: number;
  dispatch: React.Dispatch<Action>;
}

const StartScreen: React.FC<StartScreenProps> = ({ numQuestions,dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;
