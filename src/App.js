import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import Quiz from './Quiz';
import useQuiz from './Quiz/States/useQuiz';
import Result from './Result';

const App = () => {

  const [ started, setStarted ] = useState(false);

  const { currentQuiz, onAnswer, result, quizCount, currentQuizNumber, onResetAnswers } = useQuiz();

  const { collectAnswer, dummyAnswers } = useMemo(() => {
    return {
      collectAnswer : currentQuiz?.answer1,
      dummyAnswers : [
        currentQuiz?.answer2,
        currentQuiz?.answer3,
        currentQuiz?.answer4,
      ],
    };
  }, [ currentQuiz ]);

  const onRestart = () => {
    onResetAnswers();
    setStarted(false);
  }

  return (
    <Container>
      {started ? (
        <React.Fragment>
          {currentQuiz ? (
            <Quiz
              key={ currentQuiz?.quiz }
              quiz={ currentQuiz?.quiz }
              collectAnswer={ collectAnswer }
              dummyAnswers={ dummyAnswers }
              quizCount={ quizCount }
              currentQuizNumber={ currentQuizNumber }
              onAnswer={ onAnswer }
              />
          ) : (
            <Result result={ result } onResetAnswers={ onRestart } />
          )}
        </React.Fragment>
      ) : (
        <StartButton>
          <button onClick={() => setStarted(true)}>開始する</button>
        </StartButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  max-width : 980px;
  height : 100%;
  margin : 20px auto 0 auto;
`;

const StartButton = styled.div`
  width : 100%;
  height : 100%;

  display : flex;
  flex-direction : row;
  justify-content : center;
  align-items : center;

  & > button {
    font-size : 200%;
  }
`;

export default App;
