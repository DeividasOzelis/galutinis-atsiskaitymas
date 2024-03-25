import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/questions`)
            .then(res => res.json())
            .then(data => setPosts(data))
    }, []);

    return (
        <DataContext.Provider
            value={{
                posts,
                setPosts
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
export { DataProvider };
export default DataContext;