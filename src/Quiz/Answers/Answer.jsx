import { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

const Answer = ({ label, children, isCollect, answered, ...props }) => {

    const answerBackGroundColor = useMemo(() => {
        if (answered) {
            return isCollect ? 'rgba(255, 255, 0, .2)' : 'rgba(0, 0, 0, .1)';
        }
        return 'transparent';
    }, [ answered, isCollect ]);

    return (
        <AnswerStyled {...props} backgroundColor={ answerBackGroundColor }>
            <AnswerJudgeStyled>
                {answered && <AnsweredIcon color={ isCollect ? '#ffff00' : '#cccccc' }>{ isCollect ? '正解' : '不正解' }</AnsweredIcon> }
            </AnswerJudgeStyled>
            <div>{ label }. { children }</div>
        </AnswerStyled>
    )
}

const AnswerStyled = styled.div`
    padding : 11px;
    border : 6px solid #ccc;
    border-radius : 22px;
    box-sizing : border-box;

    cursor : pointer;
    user-select: none;

    background-color : ${({ backgroundColor }) => backgroundColor};
`;

const AnswerJudgeStyled = styled.div`
    position : relative;
`;

const AnsweredAnimation = keyframes`
    0% {
        bottom : 20px;
        opacity : 1;
    }
    100% {
        bottom : 140px;
        opacity : .5;
    }
`;

const AnsweredIcon = styled.div`
    position : absolute;
    width : 100%;
    box-sizing : border-box;
    font-size : 120%;
    font-weight : 900;
    text-align : center;
    -webkit-text-stroke : 2px #333;
    color : ${({ color }) => color };

    animation : ${ AnsweredAnimation } 1s;
`;

export default Answer;