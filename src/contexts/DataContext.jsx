import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [logedInUser, setLogedInUser] = useState(false);
    const [openModalData, setOpenModalData] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editAnswerModal, setEditAnswerModal] = useState(false);
    const [editQuestionModal, setEditQuestionModal] = useState(false);



    useEffect(() => {
        fetch(`http://localhost:3000/questions`)
            .then(res => res.json())
            .then(data => setPosts(data))
    }, []);
    useEffect(() => {
        Promise.all([fetch(`http://localhost:3000/users`)
            .then(res => res.json()),
        fetch(`http://localhost:3000/answers`)
            .then(res => res.json())])
            .then(([users, answers]) => {
                handleLikeCount(users, answers);
            })
    }, []);
    // useEffect(() => {
    //     fetch(`http://localhost:3000/answers`)
    //         .then(res => res.json())
    //         .then(data => setAnswers(data))
    // }, []);

    const createUser = newUser => {
        setLogedInUser(newUser);
        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });
        setUsers([...users, newUser]);
    };
    const createPost = newPost => {
        fetch(`http://localhost:3000/questions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        });
        setPosts([...posts, newPost]);
    };
    const createAnswer = newAnswer => {
        fetch(`http://localhost:3000/answers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAnswer)
        });
        setAnswers([...answers, newAnswer]);
    };
    const deleteAnswer = id => {
        fetch(`http://localhost:3000/answers/${id}`, {
            method: "DELETE"
        });
        setAnswers(answers.filter(el => el.id !== id));
    };
    const deleteQuestion = id => {
        fetch(`http://localhost:3000/questions/${id}`, {
            method: "DELETE"
        });
        setPosts(posts.filter(el => el.id !== id));
    };

    const editAnswer = editedAnswer => {
        fetch(`http://localhost:3000/answers/${editedAnswer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedAnswer)
        });
        setAnswers(answers.map(el => {
            if (el.id === editedAnswer.id) {
                return editedAnswer
            }
            else return el
        }));
    };
    const editQuestion = editedQuestion => {
        fetch(`http://localhost:3000/questions/${editedQuestion.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedQuestion)
        });
        setPosts(posts.map(el => {
            if (el.id === editedQuestion.id) {
                return editedQuestion
            }
            else return el
        }));
    };
    const handleLike = (answerId, userId) => {
        const usersMaped = users.map(el => {
            if (el.id === userId) {
                const liked = el.liked.includes(answerId) ? el.liked.filter(el => el !== answerId) : [...el.liked, answerId];
                return { ...el, liked }
            }
            return el
        });
        setUsers(usersMaped)
        handleLikeCount(usersMaped, answers);
        fetch(`http://localhost:3000/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                liked: usersMaped.find(el => el.id === userId).liked
            })
        });
    }
    const answeredPosts = answers.map(el => el.questionId);
    const handleFilter = e => {
        if (e.target.value === "rep") {
            fetch(`http://localhost:3000/questions`)
                .then(res => res.json())
                .then(data => setPosts(data.filter(el => answeredPosts.includes(el.id))))
        } else if (e.target.value === "none") {
            fetch(`http://localhost:3000/questions`)
                .then(res => res.json())
                .then(data => setPosts(data))
        } else if (e.target.value === "norep") {
            fetch(`http://localhost:3000/questions`)
                .then(res => res.json())
                .then(data => setPosts(data.filter(el => answeredPosts.includes(el.id) === false)))
        }
    };

    const handleLikeCount = (usersMaped, answers) => {
        const likes = answers.map(el => {
            const likesCount = usersMaped.reduce((likesCount, user) => user.liked.includes(el.id) ?
                likesCount + 1 : likesCount, 0);
            return { ...el, likesCount }
        })
        setAnswers(likes);
        setUsers(usersMaped);
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
                createUser,
                answers,
                setAnswers,
                openModalData,
                setOpenModalData,
                createPost,
                openModal,
                setOpenModal,
                createAnswer,
                deleteAnswer,
                editAnswerModal,
                setEditAnswerModal,
                editAnswer,
                deleteQuestion,
                editQuestionModal,
                setEditQuestionModal,
                editQuestion,
                handleLike,
                handleFilter,
                handleLikeCount
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
export { DataProvider };
export default DataContext;