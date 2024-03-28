import logo from '../media/logo.png';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    height: 210px;
    background-color: var(--dark);
    > .stuff{
        border-bottom: 2px solid var(--light2);
        padding-bottom: 10px;
        display: flex;
        justify-content: space-around;
        > :first-child{
            display: flex;
            justify-content: center;
            align-items: center;
            > a{
                > img{
                    width: 150px;
                }
            }
        }
        > div{
            > h3{
                color: var(--light2);
                border-bottom: solid 2px var(--light2);
                font-weight: bold;
                letter-spacing: 1px;
                margin: 10px 0;
                /* margin-bottom: 10px; */
            }
            > ul{
                list-style: none;
                padding: 0;
                margin: 0;
                > *+* {
                    margin-top: 10px;
                }
                > li{
                    color: var(--light3);
                    > a{
                        text-decoration: none;
                        color: var(--light3);
                    }
                    > i{
                        color: var(--light2);
                    }
                }
            }
        }
        > :last-child{
            > ul{
                display: flex;
                flex-direction: column;
                align-items: center;
                > li{
                    > a{
                        color: var(--light2);
                        &:hover{
                            color: var(--light3);
                        }
                    }
                }
            }
        }
    }
    > .owner{
        display: flex;
        justify-content: center;
        align-items: center;
        > span{
            color: var(--light3);
            margin-top: 5px;
        }
    }
`;

function Footer() {
    const date = new Date().getFullYear();
    return ( 
        <StyledSection>
            <div className="stuff">
                <div>
                    <Link to={'/'}><img src={logo} alt="logo" /></Link>
                </div>
                <div>
                    <h3>Usefull Links</h3>
                    <ul>
                        <li><a href="https://stackoverflow.com/" target='_blank' rel='noreferrer'>StackOverFlow</a></li>
                        <li><a href="https://react.dev/" target='_blank' rel='noreferrer'>React Dev</a></li>
                        <li><a href="https://developer.mozilla.org/en-US/" target='_blank' rel='noreferrer'>Mdn Web Docs</a></li>
                        <li><a href="https://www.w3schools.com/" target='_blank' rel='noreferrer'>W3Schools</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Legal Stuff</h3>
                    <ul>
                        <li>Cookies</li>
                        <li>Privacy Policy</li>
                        <li>Copyright Notice</li>
                    </ul>
                </div>
                <div>
                    <h3>Contacts</h3>
                    <ul>
                        <li><i className='bi bi-house-fill'></i> Vilniaus str. 88 - 7, Alytus, LT-68547</li>
                        <li><i className='bi bi-telephone-fill'></i> +370-674-31899</li>
                        <li><i className='bi bi-envelope-fill'></i> info@cforum.com</li>
                    </ul>
                </div>
                <div>
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://www.youtube.com/" target='_blank' rel='noreferrer'><i className='bi bi-youtube'></i></a></li>
                        <li><a href="https://www.facebook.com/" target='_blank' rel='noreferrer'><i className='bi bi-facebook'></i></a></li>
                        <li><a href="https://www.instagram.com/" target='_blank' rel='noreferrer'><i className='bi bi-instagram'></i></a></li>
                        <li><a href="https://twitter.com/?lang=en" target='_blank' rel='noreferrer'><i className='bi bi-twitter-x'></i></a></li>
                    </ul>
                </div>
            </div>
            <div className="owner">
                <span>Created by Me &copy; {date}</span>
            </div>
        </StyledSection>
     );
}

export default Footer;