import logo from '../media/logo.png';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../contexts/DataContext';

const StyledSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 200px;
    background-color: var(--dark);
    > :first-child{
        width: 200px;
        > img{
            width: 100%;
            display: block;
            cursor: pointer;
        }
    }
    > :last-child{
        width: fit-content;
        display: flex;
        flex-direction: column;
        height: 100%;
        > .user{
            height: 100px;
            display: flex;
            align-items: center;
            gap: 10px;
            > .avatar{
                cursor: pointer;
                position: relative;
                overflow: hidden;
                border-radius: 50px;
                border: solid var(--light2) 3px;
                width: 50px;
                height: 50px;
                > img{
                    position: absolute;
                    top: 50%;
                    right: 50%;
                    transform: translate(50%, -50%);
                    width: 120%;
                }
            }
            > span{
                color: var(--light2);
                font-weight: bold;
                font-size: 1.5rem;
            }
            > button{
                margin-left: 20px;
            }
        }
        > .log{
            position: relative;
            height: 100px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
            > span{
                position: absolute;
                bottom: 30px;
                right: 0;
                font-weight: bold;
                color: white;
                background-color: red;
                padding: 0 10px;
                padding-bottom: 4px;
            }
            > form{
                padding-top: 10px;
                display: flex;
                gap: 10px;
                > :first-child,
                    :nth-child(2){
                    outline: none;
                    background-color: var(--light3);
                }
            }
            > button{
                margin-top: 10px;
            }
        }
        > .nav{
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            > ul{
                list-style: none;
                display: flex;
                margin: 0;
                padding: 0;
                gap: 20px;
                > li{
                    > a{
                        text-decoration: none;
                        font-size: 2rem;
                        color: white;
                        font-weight: bold;
                        &:hover{
                            color: var(--light2);
                        }
                    }
                }
            }
        }
    }
`;

function Header() {
    const navigate = useNavigate();
    const [failedLogin, setFailedLogin] = useState(false);

    const { setLogedInUser, users, logedInUser } = useContext(DataContext);

    const formik = useFormik({
        initialValues:{
            userName: "",
            password: ""
        },
        onSubmit: values => {
            if(!user){
                setFailedLogin(true);
                return
            }else{
                setLogedInUser(user);
                setFailedLogin(false);
                formik.resetForm();
                navigate('board');
            }
        }
    });
    const user = users.find(el => el.userName === formik.values.userName && el.password === formik.values.password);

    return ( 
        <StyledSection>
            <div>
                <img src={logo} alt="logo" onClick={() => navigate('/')}/>
            </div>
            <div>
                {
                    logedInUser ?
                    <div className="user">
                        <div className="avatar">
                            <img src={logedInUser.avatar} alt="avatar" />
                        </div>
                        <span>{logedInUser.userName}</span>
                        <button className='primary-btn' onClick={() => {setLogedInUser(false); navigate('/')}}>Sign Out</button>
                    </div> :
                    <div className="log">
                        <form onSubmit={formik.handleSubmit}>
                            <input 
                                type="text" 
                                name="userName" 
                                id="userName" 
                                placeholder='User Name'
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                required
                            />
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder='Password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                required
                            />
                            <input type="submit" value="Sign In" className='primary-btn'/>
                        </form>
                        <button className='primary-btn' onClick={() => navigate('register')}>Sign Up</button>
                        {
                            failedLogin && <span>User name or password is wrong!</span>
                        }
                    </div>
                }
                <div className="nav">
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/board'}>Board</Link></li>
                    </ul>
                </div>
            </div>
        </StyledSection>
     );
}

export default Header;