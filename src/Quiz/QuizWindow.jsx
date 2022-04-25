import styled from 'styled-components';

const QuizWindow = ({ children, ...props }) => {
    return (
        <QuizWindowStyled {...props}>
            { children }
        </QuizWindowStyled>
    )
}

const QuizWindowStyled = styled.div`
    padding : 22px;
    border : 6px solid #ccc;
    border-radius : 22px;
`;

export default QuizWindow;