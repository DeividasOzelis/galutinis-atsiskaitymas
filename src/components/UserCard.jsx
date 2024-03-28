import styled from "styled-components";
import { useContext } from "react";
import DataContext from "../contexts/DataContext";

const StyledDiv = styled.div`
    background-color: var(--dark);
    width: 300px;
    padding: 20px 10px;
    border: solid 1px white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    > h1{
        color: var(--light3);
        margin-block: 5px;
        border-bottom: 2px solid var(--light3);
    }
    > span{
        color: var(--light3);
        margin-bottom: 10px;
        > .yes{
            color: red;
            font-weight: bold;
        }
        > .no{
            color: green;
            font-weight: bold;
        }
    }
    > .btn{
        display: flex;
        gap: 20px;
    }
`;

function UserCard({ data }) {

    const { users, setUsers} = useContext(DataContext);
    
    const setBan = id => {
        if(users?.find(el => el.id === id).banned === false){
            fetch(`http://localhost:3000/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ banned: true })
            });
            setUsers(users.map(el => {
                if(el.id === id){
                    return {...el, banned: true}
                }else{
                    return el
                }
            }));
        }else {
            fetch(`http://localhost:3000/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ banned: false })
            });
            setUsers(users.map(el => {
                if (el.id === id) {
                    return { ...el, banned: false }
                } else {
                    return el
                }
            }))
        }
    };
    const setRole = id => {
        if (users?.find(el => el.id === id).role === "user") {
            fetch(`http://localhost:3000/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ role: "moderator" })
            });
            setUsers(users.map(el => {
                if (el.id === id) {
                    return { ...el, role: "moderator" }
                } else {
                    return el
                }
            }));
        } else {
            fetch(`http://localhost:3000/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ role: "user" })
            });
            setUsers(users.map(el => {
                if (el.id === id) {
                    return { ...el, role: "user" }
                } else {
                    return el
                }
            }));
        }
    };

    return ( 
        <StyledDiv>
            <h1>{data.userName}</h1>
            <span>Email: {data.email}</span>
            <span>Role: {data.role}</span>
            <span>Banned: { data.banned  ? <span className="yes">Yes</span> : <span className="no">No</span>}</span>
            <div className="btn">
                <button className="primary-btn" onClick={() => setBan(data.id)}>Ban/Unban</button>
                <button className="primary-btn" onClick={() => setRole(data.id)}>Set Role</button>
            </div>
        </StyledDiv>
     );
}

export default UserCard;