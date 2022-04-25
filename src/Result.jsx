import { useCallback } from 'react';
import styled from 'styled-components';

const Result = ({ result, onResetAnswers, ...props }) => {

    const { quiz, collectCount, answerCount, collectRatio, userAnswers } = result;

    const getQuizDataByAnswerNumber = useCallback(answerNumber => {
        return quiz?.[answerNumber] ?? {};
    }, [ quiz ]);

    return (
        <ResultStyled {...props}>
            <ResultWrapperWithStyled>
                回答数：{ answerCount }<br />
                正解数：{ collectCount } ({ collectRatio * 100 }%)<br />
            </ResultWrapperWithStyled>
            <UserAnswersGroupWithStyled>
                {userAnswers?.map(({ label, isCollect, time }, answerNumber) => {

                    const { quiz : quizText } = getQuizDataByAnswerNumber(answerNumber);

                    return (
                        <UserAnswerRowWithStyled key={ label }>
                            <CollectTextWithStyled color={ isCollect ? '#ffd700' : '#666666'}>{ isCollect ? `正解` : `不正解` }</CollectTextWithStyled>
                            <AnswerTextWithStyled>{ label }</AnswerTextWithStyled>
                            <QuizTextWithStyled>{ quizText }</QuizTextWithStyled>
                        </UserAnswerRowWithStyled>
                    )
                })}
            </UserAnswersGroupWithStyled>

            <button onClick={() => onResetAnswers()}>最初から</button>

        </ResultStyled>
    )
}

const ResultStyled = styled.div`
    padding : 22px;
    border : 6px solid #ccc;
    border-radius : 22px;
`;

const ResultWrapperWithStyled = styled.div`
    margin-bottom : 20px;
`;

const UserAnswersGroupWithStyled = styled.div`
    font-size : 60%;
    
    & > :not(:last-child) {
        margin-bottom : 10px;
    }
`;

const UserAnswerRowWithStyled = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : start;
    align-items : center;
    
    padding : 5px;

    &:nth-of-type(2n) {
        background-color : #efefef;
    }
`;

const CollectTextWithStyled = styled.div`
    width : 50px;
    text-align : center;
    color : ${({ color }) => color};
`;

const AnswerTextWithStyled = styled.div`
    width : 100px;
`;

const QuizTextWithStyled = styled.div`
    font-size : 80%;
    width : calc(100% - 150px);
`;

export default Result;