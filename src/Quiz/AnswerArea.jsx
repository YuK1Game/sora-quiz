import styled from 'styled-components';
import Answer from '../Quiz/Answers/Answer';

const AnswerArea = ({ answers, answeredIndex, onClickAnswer, ...props }) => {
    return (
        <AnswerAreaStyled {...props}>
            {answers?.map(({ label, isCollect }, index) => (
                <Answer
                    key={ index }
                    label={['A', 'B', 'C', 'D'][index]}
                    answered={ index === answeredIndex }
                    isCollect={ isCollect }
                    onClick={() => onClickAnswer(label, isCollect, index)}
                    >{ label }</Answer>
            ))}
        </AnswerAreaStyled>
    )
}

const AnswerAreaStyled = styled.div`
    display : flex;
    flex-direction : row;
    flex-wrap : wrap;

    & > div {
        width : calc((100% - 30px) / 2);
        margin-right : 30px;
        margin-bottom : 40px;

        &:nth-child(2n) {
            margin-right : 0px;
        }
    }

    margin-top : 40px;
`;

export default AnswerArea;