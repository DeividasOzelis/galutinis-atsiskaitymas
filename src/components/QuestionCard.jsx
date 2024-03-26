import styled from "styled-components";
import { useContext } from "react";
import DataContext from "../contexts/DataContext";

const StyledDiv = styled.div`
    margin-block: 8px;
    border-radius: 10px;
    overflow: hidden;
    background-color: var(--light2);
    display: flex;
    > .left{
        position: relative;
        background-color: var(--dark);
        width: 80%;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        > h1{
            margin: 5px 20px;
            color: var(--light2);
        }
        > .border{
            width: 80%;
            > p{
            max-width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 5px 20px;
            color: var(--light3);
        }
        }
        > button{
            position: absolute;
            padding-top: 3px;
            right: 30px;
            top: 23px;
            transform: scale(1.2);
        }
    }
    > .right{
        width: 20%;
        background-color: var(--light2);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
        > p{
            margin: 0;
            margin-left: 50px;
            font-weight: bold;
            color: var(--dark);
            > span{
                color: var(--light3);
            }
        }
    }
`;

function QuestionCard({ data }) {

    const { users, answers } = useContext(DataContext);

    const author = users.filter(el => el.id === data.userId);

    const connectedAnswers = answers.filter(el => el.questionId === data.id);
    
    return ( 
        <StyledDiv>
            <div className="left">
                <h1>{data.subject}</h1>
                <div className="border">
                    <p>{data.question}</p>
                </div>
                <button className="primary-btn">Read Answers</button>
            </div>
            <div className="right">
                <p>Created: <span>{data.date}</span></p>
                <p>Answers: <span>{connectedAnswers.length}</span></p>
                <p>Author: <span>{author[0]?.userName}</span></p>
            </div>
        </StyledDiv>
     );
}

export default QuestionCard;