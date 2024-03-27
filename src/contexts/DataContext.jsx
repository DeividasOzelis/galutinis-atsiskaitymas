import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [logedInUser, setLogedInUser] = useState(false);
    const [openModalData, setOpenModalData] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/questions`)
            .then(res => res.json())
            .then(data => setPosts(data))
    }, []);
    useEffect(() => {
        fetch(`http://localhost:3000/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);
    useEffect(() => {
        fetch(`http://localhost:3000/answers`)
            .then(res => res.json())
            .then(data => setAnswers(data))
    }, []);

    const createUser = newUser => {
        setLogedInUser(newUser);
        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newUser)
        });
        setUsers([...users, newUser]);
    };
    const createPost = newPost => {
        fetch(`http://localhost:3000/questions`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newPost)
        });
        setPosts([...posts, newPost]);
    };
    const createAnswer = newAnswer => {
        fetch(`http://localhost:3000/answers`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newAnswer)
        });
        setAnswers([...answers, newAnswer]);
    };

    return (
        <DataContext.Provider
            value={{
                posts,
                setPosts,
                users,
                setUsers,
                logedInUser,
                setLogedInUser,
                createUser,
                answers,
                setAnswers,
                openModalData,
                setOpenModalData,
                createPost,
                openModal,
                setOpenModal,
                createAnswer
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
export { DataProvider };
export default DataContext;