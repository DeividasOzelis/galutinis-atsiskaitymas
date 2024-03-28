import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import DataContext from "../contexts/DataContext";
import AnswerCard from './AnswerCard';
import ErrorPage from "./ErrorPage";

const StyledSection = styled.section`
    position: relative;
    > .filter{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        top: 30px;
        right: 40%;
        > label{
            color: var(--light3);
            font-weight: bold;
            font-size: 1.3rem;
        }
        > select{
            background-color: var(--light3);
            outline: none;
            font-weight: bold;
            color: var(--dark);
            > option{
                font-weight: bold;
                color: var(--dark);
            }
        }
    }
    > :last-child{
        padding-bottom: 50px;
    }
    > .msg {
        position: absolute;
        top: 10px;
        right: 30px;
        width: 200px;
        background-color: var(--dark);
        color: var(--light3);
        padding: 5px 10px;
        border-radius: 10px;
        > span{
            > a{
                color: white;
            }
        }
    }
    > .primary-btn{
        position: absolute;
        top: 30px;
        right: 50px;
        transform: scale(1.2);
        padding-top: 4px;
    }
    > h1{
        margin: 0;
        padding: 20px 0;
        color: var(--light3);
    }
    > .border{
        border-top: 3px solid var(--light3);
    }
    > .question{
        position: relative;
        border-radius: 15px;
        background-color: var(--dark);
        > .pic{
            margin: 10px 20px;
            > img{
                max-width: 500px;
            }
        }
        > .edit{
                position: absolute;
                top: 20px;
                right: 20px;
                display: flex;
                gap: 40px;
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
            font-size: 2rem;
            padding-top: 20px;
            margin: 10px 20px;
            color: var(--light3);
        }
        > p{
            font-size: 1.4rem;
            width: 100ch;
            margin: 10px 20px;
            color: var(--light3);
        }
        > .data{
            > p{
                color: white;
                margin: 10px 20px;
            }
            > :last-child{
                padding-bottom: 10px;
            }
        }
    }
    > .answers{
        > p{
            color: var(--light3);
        }
    }
    
`;

function QuestionPage() {

    const navigate = useNavigate();
    let { id } = useParams();
    const { posts, answers, logedInUser, users, setOpenModal, deleteQuestion, setEditQuestionModal } = useContext(DataContext);

    const question = posts.find(el => el.id === id);
    const [sort, setSort] = useState("none");
    if (posts.length && !question) return <ErrorPage />
    const author = users.filter(el => el.id === question.userId);
    const relatedAnswers = answers.filter(el => el.questionId === id);


    relatedAnswers.sort((a, b) => {
        if (sort === "least") { return a.likesCount - b.likesCount } else if (sort === "most") {
            return b.likesCount - a.likesCount
        } else {
            return 0
        }
    });

    if (!question) return null
    return (
        <StyledSection>
            {
                logedInUser ?
                    <button className="primary-btn" onClick={() => setOpenModal(question)}>Answer this question</button> :
                    <div className="msg">
                        <span >To answer question you have to Sign In or <Link to={"/register"}>Sign Up</Link> </span>
                    </div>
            }
            <div className="filter">
                <label htmlFor="srt">Sort answers: </label>
                <select
                    name="srt"
                    id="srt"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                >
                    <option value="none">No sorting</option>
                    <option value="most">Most popular</option>
                    <option value="least">Least popular</option>
                </select>
            </div>
            <h1>Question</h1>
            <div className="border"></div>
            <div className="question">
                {
                    logedInUser.id === question.userId || logedInUser.role === "admin" ?
                        <div className="edit">
                            <i className="bi bi-pencil-fill" onClick={() => setEditQuestionModal(question)}></i>
                            <i className="bi bi-trash-fill"
                                onClick={() => {
                                    deleteQuestion(question.id);
                                    navigate('/board');
                                }}>
                            </i>
                        </div> :
                        null
                }
                <h1>{question.subject}</h1>
                <p>{question.question}</p>
                {
                    question.image === "" ?
                        null :
                        <div className="pic">
                            <img src={question.image} alt="" />
                        </div>
                }
                <div className="data">
                    {
                        logedInUser.id === question.userId || logedInUser.role === "admin" ?
                            question.edited.length ?
                                <p>Edited: <span>{question.edited[0]}</span></p> :
                                <p>Created: <span>{question.date}</span></p> :
                            <p>Created: <span>{question.date}</span></p>
                    }
                    <p>Author: <span>{author[0]?.userName}</span></p>
                </div>
            </div>
            <div className="border"></div>
            <h1>Answers</h1>
            <div className="border"></div>
            <div className="answers">
                {
                    !relatedAnswers.length ?
                        <p>This question has no answers yet...</p> :
                        relatedAnswers?.map(el => {
                            return <AnswerCard
                                key={el.id}
                                data={el}
                            />
                        })
                }
            </div>
            <div className="border"></div>
        </StyledSection>
    );
}

export default QuestionPage;