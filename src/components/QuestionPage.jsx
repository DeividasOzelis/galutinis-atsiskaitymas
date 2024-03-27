import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../contexts/DataContext";
import AnswerCard from './AnswerCard';

const StyledSection = styled.section`
    position: relative;
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
        border-radius: 15px;
        background-color: var(--dark);
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

    let { id } = useParams();
    const { posts, answers, logedInUser, users, setOpenModal } = useContext(DataContext);

    const question = posts.find(el => el.id === id); 
    const author = users.filter(el => el.id === question.userId);
    const relatedAnswers = answers.filter(el => el.questionId === id);
    
    return ( 
        <StyledSection>
            {
                logedInUser ? 
                <button className="primary-btn" onClick={() => setOpenModal(question)}>Answer this question</button> :
                <div className="msg">
                    <span >To answer question you have to Sign In or <Link to={"/register"}>Sign Up</Link> </span>
                </div>
            }
            <h1>Question</h1>
            <div className="border"></div>
            <div className="question">     
                    <h1>{question.subject}</h1>
                    <p>{question.question}</p>
                <div className="data">
                    <p>Created: <span>{question.date}</span></p>
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