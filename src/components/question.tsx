import { Dispatch } from 'react';
import { Action } from '../App'; // فرض کردم Action رو از App.tsx صادر کردی
// اگر مسیر دیگه‌ایه، اصلاحش می‌کنیم

// Props
interface QuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
    correctOption: number;
  };
  dispatch: Dispatch<Action>;
  answer: number | null;
}

const Question: React.FC<QuestionProps> = ({ question, dispatch, answer }) => {
  const hasAnswered = answer !== null;

  return (
    <>
      <h4>{question.question}</h4>

      <div className="options">
        {question.options.map((choice, index) => (
          <button
            key={choice}
            className={`btn btn-option 
              ${index === answer ? 'answer' : ''} 
              ${hasAnswered ? (index === question.correctOption ? 'correct' : 'wrong') : ''}
            `}
            onClick={() => dispatch({ type: 'newAnswer', payLoad: index })}
            disabled={hasAnswered}
          >
            {choice}
          </button>
        ))}
      </div>
    </>
  );
};

export default Question;
