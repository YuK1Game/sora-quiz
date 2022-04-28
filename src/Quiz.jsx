import { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import QuizWindow from "./Quiz/QuizWindow";
import AnswerArea from "./Quiz/AnswerArea";
import Answer from "./Quiz/Answers/Answer";
import ProgressBar from './Quiz/ProgressBar';

const Quiz = ({ quiz, collectAnswer, dummyAnswers, quizCount, currentQuizNumber, onAnswer, ...props }) => {

    const [ answeredIndex, setAnsweredIndex ] = useState(null);

    const answers = useMemo(() => {
        return [
            { label : collectAnswer, isCollect : true },
            { label : dummyAnswers[0], isCollect : false },
            { label : dummyAnswers[1], isCollect : false },
            { label : dummyAnswers[2], isCollect : false },
        ].sort(()=> Math.random() - 0.5);
    }, [ collectAnswer, dummyAnswers ]);

    const onClickAnswer = useCallback((label, isCollect, index) => {
        if (answeredIndex === null) {
            setAnsweredIndex(index);
            const intervalId = setTimeout(() => {
                onAnswer(label, isCollect, index);
            }, 1000);
            return () => {
                clearInterval(intervalId);
            }
        }
    }, [ answeredIndex ])

    const onFinish = () => onAnswer('時間切れ', false, 0);

    return (
        <QuizStyled {...props}>
            <QuizCounter>第{ currentQuizNumber }門/{ quizCount }門</QuizCounter>
            <QuizWindowStyled>{ quiz }</QuizWindowStyled>
            <ProgressBarWithStyled second={ 15 } onFinish={ onFinish } />
            <AnswerArea answers={ answers } answeredIndex={ answeredIndex } onClickAnswer={ onClickAnswer } />
        </QuizStyled>
    )
}

const QuizStyled = styled.div`
    & > *:not(:last-child) {
        margin-bottom : 20px;
    }
`;

const QuizWindowStyled = styled(QuizWindow)`
    height : 48px;
`;

const QuizCounter = styled.div`
    font-size : 80%;
`;

const ProgressBarWithStyled = styled(ProgressBar)``;

export default Quiz;