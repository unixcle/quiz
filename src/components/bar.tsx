


interface BarProps {
    numQuestions: number;
    index: number;
    answer: number | null;
    points: number;
    maxPoints: number;
  }
  
  function Bar({ numQuestions, index, answer, points, maxPoints }: BarProps) {
    return (
      <>
        <div className="progress">
          <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
          <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
          <p><strong>{points}</strong> / {maxPoints}</p>
        </div>
      </>
    );
  }
  
  export default Bar;
  