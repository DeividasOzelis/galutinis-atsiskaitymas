import { useContext, useEffect } from "react";
import DataContext from "../contexts/DataContext";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from 'yup';


const StyledModal = styled.div`
    background-color: var(--dark);
    display: flex;
    flex-direction: column;
    > h1{
        color: var(--light3);
    }
    > form{
        width: 500px;
        display: flex;
        flex-direction: column;
        > span{
            width: fit-content;
            color: white;
            font-size: 0.8rem;
            padding: 2px 5px;
            margin-top: 7px;
            background-color: red;

        }
        > label{
            margin-bottom: 10px;
            margin-top: 10px;
            color: var(--light3);
            font-weight: bold;
        }
        > input{
            outline: none;
            background-color: var(--light3);
        }
        > textarea{
            max-width: 500px;
            outline: none;
            background-color: var(--light3);
        }
        > :last-child{
            width: fit-content;
            place-self: flex-end;
            background-color: unset;
            font-size: 1.3rem;
            margin-top: 15px;
            &:hover{
                background-color: var(--light2);
            }
        }
    }
    > button{
        position: absolute;
        font-size: 1.5rem;
        padding: 4px 11px;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
`;

function UserEditModal() {

    const { userEditModal, setUserEditModal, editUser } = useContext(DataContext);


    const formik = useFormik({
        initialValues: {
            id: "",
            userName: "",
            password: "",
            email: "",
            role: "",
            avatar: "",
            liked: ""
        },
        onSubmit: values => {
            formik.resetForm();
            const editedUser = {
                id: userEditModal.id,
                userName: formik.values.userName,
                password: formik.values.password,
                email: formik.values.email,
                role: userEditModal.role,
                avatar: formik.values.avatar,
                liked: userEditModal.liked
            };
            editUser(editedUser);
            setUserEditModal(false);
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required("This field must be filled!")
                .min(5, "Must contain 5 symbols at least!")
                .max(15, "Max 15 symbols!")
                .trim(),
            password: Yup.string()
                .max(15, "Max 15 symbols!")
                .required("This field must be filled!")
                // eslint-disable-next-line
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character!")
                .trim(),
            email: Yup.string()
                .required("This field must be filled!")
                .trim(),
            avatar: Yup.string()
                .required("This field must be filled!")
                .trim()
        })
    })
    useEffect(() => {
        if (userEditModal) {
            formik.setValues({
                userName: userEditModal.userName,
                password: userEditModal.password,
                email: userEditModal.email,
                avatar: userEditModal.avatar
            })
        }
        // eslint-disable-next-line 
    }, [userEditModal, formik.setValues]);



    if (userEditModal) {
        document.body.classList.add('active-modal5')
    } else {
        document.body.classList.remove('active-modal5')
    };

    if (!userEditModal) return null



    return (
        <>
            <div className="overlay"></div>
            <StyledModal className="modal">
                <button onClick={() => { setUserEditModal(false); formik.resetForm() }} className="primary-btn">×</button>
                <h1>Edit your profile!</h1>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="userName">Your user name:</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formik.values.userName}
                        placeholder="User name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.userName && formik.errors.userName && <span>{formik.errors.userName}</span>
                    }
                    <label htmlFor="password">Your password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>
                    }
                    <label htmlFor="email">Your email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>
                    }
                    <label htmlFor="avatar">Your avatars url:</label>
                    <input
                        type="url"
                        id="avatar"
                        name="avatar"
                        value={formik.values.avatar}
                        placeholder="Your avatar"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.avatar && formik.errors.avatar && <span>{formik.errors.avatar}</span>
                    }
                    <input type="submit" value="Edit" className="primary-btn" />
                </form>
            </StyledModal>
        </>
    );
}

export default UserEditModal;