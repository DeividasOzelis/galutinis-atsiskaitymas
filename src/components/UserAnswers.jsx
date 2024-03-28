import styled from "styled-components";
import { useContext } from "react";
import DataContext from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

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
            margin-left: 20px;
            color: var(--light3);
        }
        }
        > button{
            position: absolute;
            padding-top: 3px;
            right: 30px;
            top: 50%;
            transform: scale(1.2) translateY(-50%);
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

function UserAnswers({ data }) {

    const navigate = useNavigate();

    const { users, logedInUser } = useContext(DataContext);

    const author = users.filter(el => el.id === data.userId);

    return (
        <StyledDiv>
            <div className="left">
                <div className="border">
                    <p>{data.answer}</p>
                </div>
                <button className="primary-btn" onClick={() => navigate(`/board/${data.questionId}`)}>Go to this post</button>
            </div>
            <div className="right">
                {
                    logedInUser.id === data.userId || logedInUser.role === "admin" ?
                        data.edited.length ?
                            <p>Edited: <span>{data.edited[0]}</span></p> :
                            <p>Created: <span>{data.date}</span></p> :
                        <p>Created: <span>{data.date}</span></p>
                }
                <p>Author: <span>{author[0]?.userName}</span></p>
            </div>
        </StyledDiv>
    );
}

export default UserAnswers;