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

    return (
        <DataContext.Provider
            value={{
                posts,
                setPosts,
                users,
                setUsers,
                logedInUser,
                setLogedInUser
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
export { DataProvider };
export default DataContext;