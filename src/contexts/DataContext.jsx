import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [logedInUser, setLogedInUser] = useState(false);

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
    }

    return (
        <DataContext.Provider
            value={{
                posts,
                setPosts,
                users,
                setUsers,
                logedInUser,
                setLogedInUser,
                createUser
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
export { DataProvider };
export default DataContext;