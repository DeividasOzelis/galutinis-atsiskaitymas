import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import DataContext from '../contexts/DataContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import  UserQuestion from './UserQuestion'
import UserAnswers from './UserAnswers';
import UserCard from './UserCard';

const StyledSection = styled.section`
    > .admin{
        > h1{
            margin: 0;
            padding-top: 20px;
            margin-bottom: 20px;
            border-bottom: 3px solid var(--light3);
            color: var(--light3);
        }
        > .container{
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
    }
    > .greeting{
        position: relative;
        > button{
            position: absolute;
            top: 26px;
            right: 15px;
            padding-top: 3px;
            transform: scale(1.2);
        }
        > h1{
            margin: 0;
            padding-block: 20px;
            margin-bottom: 20px;
            color: var(--light3);
            border-bottom: 3px solid var(--light3);
        }
        > span{
            color: var(--light3);
            font-size: 1.2rem;
        > span{
            color: white;
            font-weight: bold;
        }
    }
    }
    > .posts{
        padding-bottom: 50px;
        > .questions{
            > h1{
                color: var(--light3);
                padding-bottom: 20px;
                border-bottom: 3px solid var(--light3);
            }
        }
        > .answers{
            border-bottom: 3px solid var(--light3);
            padding-bottom: 10px;
            > h1{
                color: var(--light3);
                padding-bottom: 20px;
                border-bottom: 3px solid var(--light3);
            }
        }
    }
    
`;

function UserPage() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const navigate = useNavigate();
    const { id } = useParams();
    const {logedInUser, posts, answers, setUserEditModal, users} = useContext(DataContext);

    if (!logedInUser) return <div className="wrapper"><span>You must <Link to={"/register"}>Sign Up</Link> or Sign In!</span></div>
    if(id !== logedInUser.id) navigate(`/users/${logedInUser.id}`)
    const usersQuestions = posts.filter(el => el.userId === logedInUser.id);
    const usersAnswers = answers.filter(el => el.userId === logedInUser.id);
    return ( 
        <StyledSection>
            {
                logedInUser.role === "admin" ?
                <div className='admin'>
                    <h1>Hi, {logedInUser.userName}. Here is all users!</h1>
                    <div className="container">
                        {
                            users.filter(el => el.id !== logedInUser.id).map(el => {
                                return <UserCard 
                                    key={el.id}
                                    data={el}
                                />
                            })
                        }
                    </div>
                </div> :
                    <>
                        <div className="greeting">
                            <button className='primary-btn' onClick={() => setUserEditModal(logedInUser)}>Edit Profile</button>
                            <h1>Hi, {logedInUser.userName}.</h1>
                            <span>Your recent activity: <span>Questions: {usersQuestions.length}</span> and <span>Answers: {usersAnswers.length}</span> </span>
                        </div>
                        <div className="posts">
                            <div className="questions">
                                <h1>Your questions</h1>
                                {
                                    usersQuestions?.map(el => {
                                        return <UserQuestion
                                            key={el.id}
                                            data={el}
                                        />
                                    })
                                }
                            </div>
                            <div className="answers">
                                <h1>Your answers</h1>
                                {
                                    usersAnswers.map(el => {
                                        return <UserAnswers
                                            key={el.id}
                                            data={el}
                                        />
                                    })
                                }
                            </div>
                        </div>
                    </>
            }
        </StyledSection>
     );
}

export default UserPage;