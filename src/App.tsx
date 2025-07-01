import { useEffect, useReducer } from 'react';
import './App.css';

// Components
import Eror from './components/Eror'
import Main from './components/main';
import Header from './components/header';
import StartScreen from './components/startScreen';
import Question from './components/question';
import Loader from './components/Loader';
import Bar from './components/bar';
import Finished from './components/finished';
import NextQuestion from './components/nextQuestion';
import Timer from './components/timer';
import Foot from './components/foot';

// Types
interface Question {
  id: number;
  question: string;
  options: string[];
  correctOption: number; // اضافه شده چون تو ردیوسر استفاده شده بود
  // میشه اینجا گزینه‌ها و انتخاب‌ها رو هم تعریف کرد اگه لازم داشتی
}

interface State {
  questions: Question[];
  status: 'loading' | 'ready' | 'error' | 'active' | 'finished';
  index: number;
  answer: number | null;
  points: number;
  secRemain: number;
}

export type Action =
  | { type: 'dataReceived'; payLoad: Question[] }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'newAnswer'; payLoad: number }
  | { type: 'nextQuestion' }
  | { type: 'finish' }
  | { type: 'tick' };

// Initial state
const initialState: State = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  secRemain: 225,
};

// Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payLoad,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
      };
    case 'newAnswer': {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payLoad,
        points:
          question && action.payLoad === question.correctOption
            ? state.points + 10
            : state.points,
      };
    }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'finish':
      return {
        ...state,
        status: 'finished',
      };
    case 'tick':
      return {
        ...state,
        secRemain: state.secRemain - 1,
        status: state.secRemain === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('Unknown action');
  }
}

// App component
const App: React.FC = () => {
  const [{ questions, index, status, answer, points, secRemain }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;
  const maxPoints = numQuestions * 10;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('http://localhost:9000/questions');
        const data: Question[] = await res.json();
        dispatch({ type: 'dataReceived', payLoad: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: 'dataFailed' });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Eror />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Bar
              numQuestions={numQuestions}
              answer={answer}
              index={index}
              points={points}
              maxPoints={maxPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Foot>
              <Timer dispatch={dispatch} secRemain={secRemain} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Foot>
          </>
        )}
        {status === 'finished' && <Finished points={points} maxPoints={maxPoints} />}
      </Main>
    </>
  );
};

export default App;
