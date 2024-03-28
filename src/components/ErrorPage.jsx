import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;  
  > h1{
    margin: 0;
    padding-top: 10%;
    font-size: 4rem;
    color: var(--light3);
  }
`;

function ErrorPage() {
    return ( 
        <StyledSection>
            <h1>No such page... 🤬</h1>
        </StyledSection>
     );
}

export default ErrorPage;