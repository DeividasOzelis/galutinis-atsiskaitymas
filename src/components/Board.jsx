import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import DataContext from "../contexts/DataContext";
import QuestionCard from "./QuestionCard";

const StyledSection = styled.section`
    width: calc(100% - 60px);
    position: relative;
    padding-bottom: 50px;
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
    > .questions-container{
        border-block: 2px solid var(--light3);
        
    }
`;

function Board() {
    
    const { posts, logedInUser, setOpenModalData } = useContext(DataContext);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    

    return ( 
        <StyledSection>
            {
                logedInUser ? 
                <button className="primary-btn" onClick={() => setOpenModalData(logedInUser)}>Create new question</button> :
                <div className="msg">
                    <span >To create new question you have to Sign In or <Link to={"/register"}>Sign Up</Link> </span>
                </div>
            }
            <h1>All questions</h1>
            <div className="questions-container">
                {
                    posts.map(el => {
                        return <QuestionCard 
                                    key={el.id}
                                    data={el}
                                />
                    })
                }
            </div>
        </StyledSection>
     );
}

export default Board;