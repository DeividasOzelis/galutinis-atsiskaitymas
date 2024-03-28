import styled from "styled-components";
import { useEffect } from "react";

const StyledSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0;
    padding-block: 50px;
    user-select: none;
    > .container{
        width: 80%;
        height: 500px;
        display: flex;
        > .left{
            width: 60%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            > p{
                z-index: 100;
                background-color: var(--dark);
                border-top-right-radius: 160px;
                border-bottom-right-radius: 160px;
                padding: 70px 10px;
                border-left: 3px solid var(--light3);
                width: 70ch;
                font-size: 1.3rem;
                color: var(--light3);
                &::first-line{
                    font-size: 1.6rem;
                    font-weight: bold;
                }
            }
        }
        > .right{
            width: 40%;
            height: 100%;
            display: flex;
            flex-direction: column;
            > .top{
                width: 100%;
                height: 70%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                > .img1{
                    border: 4px solid var(--dark);
                    width: 45%;
                    height: 90%;    
                    border-top-right-radius: 120px;
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 120px;
                    border-bottom-right-radius: 10px;
                    overflow: hidden;
                    mix-blend-mode: lighten;
                    > img{
                        width: 130%;
                    }
                }
                > .img2{
                    border: 4px solid var(--dark);
                    width: 45%;
                    height: 90%;
                    border-top-left-radius: 120px;
                    border-top-right-radius: 120px;
                    border-bottom-right-radius: 120px;
                    border-bottom-left-radius: 120px;
                    overflow: hidden;
                    mix-blend-mode: lighten;
                    > img{
                        height: 100%;
                    }
                }
            }
            > .bottom{
                width: 100%;
                height: 30%;
                display: flex;
                justify-content: center;
                align-items: center;
                > .img3{
                    border: 4px solid var(--dark);
                    width: 90%;
                    height: 80%;
                    border-bottom-left-radius: 100px;
                    border-top-right-radius: 100px;
                    overflow: hidden;
                    mix-blend-mode: lighten;
                    > img{
                        width: 110%;
                    }
                }
            }
        }
    }
    
`;

function Home() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return ( 
        <StyledSection>
            <div className="container">
                <div className="left">
                    <p>Welcome to coding forum, where bytes meet brilliance! Whether you're a seasoned coder or just starting out, join our vibrant community to discuss languages, algorithms, and the latest tech trends. Let's debug together, share insights, and turn lines of code into innovative solutions. Happy coding!</p>
                </div>
                <div className="right">
                    <div className="top">
                        <div className="img1">
                            <img src="https://media.istockphoto.com/id/1077503796/photo/young-woman-is-thinking-about-the-statistics.jpg?s=612x612&w=0&k=20&c=yiNNfuNEr8Y-Pb0x-hLKL6W8i3ZwrBXrk2l9Gfsj2ZE=" alt="programing" />
                        </div>
                        <div className="img2">
                            <img src="https://cdn.create.vista.com/api/media/small/6216675/stock-photo-code-of-php-language-programming" alt="programing" />
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="img3">
                            <img src="https://www.shutterstock.com/image-photo/millennial-african-employee-sit-office-260nw-1746359810.jpg" alt="programing" />
                        </div>
                    </div>
                </div>
            </div>
        </StyledSection>
     );
}

export default Home;