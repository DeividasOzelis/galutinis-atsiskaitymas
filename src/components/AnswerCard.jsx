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
        display: flex;
        align-items: center;
        > span{
            position: absolute;
            font-size: 1.5rem;
            font-weight: bold;
            top: 50%;
            right: 120px;
            transform: translateY(-50%);
            color: var(--light3);
        }
        > label{
            position: absolute;
            top: 50%;
            right: 140px;
            transform: translateY(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.7rem;
            > input{
                color: var(--light3);
                font-size: 1.5rem;
                appearance: none;
                cursor: pointer;
            }
        }
        > .edit{
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                display: flex;
                gap: 30px;
                > i{
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--light3);
                    &:hover{
                        transform: scale(1.3);
                    }
                }
            }
        > h1{
            margin: 5px 20px;
            color: var(--light2);
        }
        > .border{
            width: 80%;
            > p{
            max-width: 100%;
            margin: 5px 20px;
            color: var(--light3);
        }
        }
    }
    > .right{
        width: 20%;
        background-color: var(--light2);
        display: flex;
        flex-direction: column;
        justify-content: center;
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

function AnswerCard({ data }) {

    const { users, logedInUser, deleteAnswer, setEditAnswerModal, handleLike } = useContext(DataContext);

    const author = users.filter(el => el.id === data.userId);

    const loged = users.find(el => el.id === logedInUser.id);

    const isLiked = loged ? loged.liked.includes(data.id) : false;


    return (
        <StyledDiv>
            <div className="left">
                {
                    logedInUser ?
                        <>
                            <label htmlFor="like">
                                <input
                                    className={isLiked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}
                                    type="checkbox"
                                    name="like"
                                    id="like"
                                    checked={isLiked}
                                    onChange={() => handleLike(data.id, logedInUser.id)}
                                />
                            </label>
                            <span>{data.likesCount}</span>
                        </>
                        : <span><i className="bi bi-hand-thumbs-up-fill"></i> {data.likesCount}</span>
                }

                {
                    logedInUser.id === data.userId || logedInUser.role === "admin" ?
                        <div className="edit">
                            <i className="bi bi-pencil-fill" onClick={() => setEditAnswerModal(data)}></i>
                            <i className="bi bi-trash-fill" onClick={() => deleteAnswer(data.id)}></i>
                        </div> :
                        null
                }
                <div className="border">
                    <p>{data.answer}</p>
                </div>
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

export default AnswerCard;