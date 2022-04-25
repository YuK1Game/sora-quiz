import styled from 'styled-components';

const AnswerArea = ({ children, ...props }) => {
    return (
        <AnswerAreaStyled {...props}>
            { children }
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