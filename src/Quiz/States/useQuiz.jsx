import { useState, useMemo, useCallback } from "react";
import useQuizList from "./useQuizList";

const useQuiz = () => {
    const quiz = useQuizList();

    const [ userAnswers, setUserAnswers ] = useState([]);

    const quizCount = useMemo(() => {
        return quiz?.length ?? 0;
    }, [ quiz ]);

    const answerCount = useMemo(() => {
        return userAnswers?.length ?? 0;
    }, [ userAnswers ]);

    const collectCount = useMemo(() => {
        return userAnswers?.filter(({ isCollect }) => isCollect)?.length ?? 0;
    }, [ userAnswers ]);

    const collectRatio = useMemo(() => {
        return answerCount > 0 ? collectCount / answerCount : 0;
    }, [ answerCount, collectCount ]);

    const userAnswerCount = useMemo(() => {
        return userAnswers?.length ?? 0;
    }, [ userAnswers ]);

    const currentQuizNumber = useMemo(() => {
        return userAnswerCount + 1;
    }, [ userAnswerCount ]);

    const currentQuiz = useMemo(() => {
        return quiz?.[currentQuizNumber - 1] ?? null;
    }, [ quiz, currentQuizNumber ]);

    const result = useMemo(() => ({
        quiz,
        collectCount,
        answerCount,
        collectRatio,
        userAnswers,
    }), [ quiz, collectCount, answerCount, collectRatio, userAnswers ]);

    const onAnswer = (label, isCollect, index) => {
        setUserAnswers(_userAnswers => [...userAnswers, { label, isCollect, index, time : new Date() }])
    };

    const onResetAnswers = () => setUserAnswers([]);

    return {
        currentQuiz,
        onAnswer,
        onResetAnswers,
        collectRatio,
        result,
        quizCount,
        currentQuizNumber,
    };
}

export default useQuiz;