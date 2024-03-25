import logo from '../media/logo.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
        }
    }
    > :last-child{
        width: fit-content;
        display: flex;
        flex-direction: column;
        height: 100%;
        > .log{
            height: 100px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
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
    return ( 
        <StyledSection>
            <div>
                <img src={logo} alt="logo" />
            </div>
            <div>
                <div className="log">
                    <form>
                        <input 
                            type="text" 
                            name="" 
                            id="" 
                            placeholder='User Name'
                            value=""
                            onChange={()=> {}}
                        />
                        <input 
                            type="password" 
                            name="" 
                            id="" 
                            placeholder='Password'
                            value=""
                            onChange={()=> {}}
                        />
                        <input type="submit" value="Log In" className='primary-btn'/>
                    </form>
                    <button className='primary-btn'>Sign Up</button>
                </div>
                <div className="nav">
                    <ul>
                        <li><Link>Home</Link></li>
                        <li><Link>Board</Link></li>
                    </ul>
                </div>
            </div>
        </StyledSection>
     );
}

export default Header;