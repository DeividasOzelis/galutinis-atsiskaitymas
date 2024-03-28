import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../contexts/DataContext";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

const StyledSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    > .register{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 400px;
        > h1{
            margin-bottom: 10px;
            color: var(--light3);
        }
        > form{
            width: 100%;
            display: flex;
            flex-direction: column;
            > span{
                width: fit-content;
                padding-inline: 5px;
                padding-bottom: 2px;
                margin-top: 2px;
                font-size: 0.8rem;
                color: white;
                background-color: red;
            }
            > input{
                outline: none;
                background-color: var(--light3);
            }
            > label{
                font-weight: bold;
                color: var(--light3);
                margin-top: 10px;
            }
            > :last-child{
                width: fit-content;
                place-self: flex-end;
                margin-top: 10px;
                margin-bottom: 20px;
                background-color: unset;
                &:hover{
                    background-color: var(--light2);
                }
            }
        }
    }
`;

function Register() {

    const { createUser } = useContext(DataContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
            passwordRepeat: "",
            email: "",
            avatar: ""
        },
        onSubmit: values => {
            formik.resetForm();
            const newUser = {
                id: uuidv4(),
                userName: formik.values.userName,
                password: formik.values.password,
                email: formik.values.email,
                role: "user",
                avatar: formik.values.avatar,
                banned: false,
                liked: []
            };
            createUser(newUser);
            navigate('/board');
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
            passwordRepeat: Yup.string()
                .required("This field must be filled!")
                .oneOf([Yup.ref("password")], "Passwords does not match!"),
            email: Yup.string()
                .required("This field must be filled!")
                .trim(),
            avatar: Yup.string()
                .required("This field must be filled!")
                .trim()
        })
    })

    return ( 
        <StyledSection>
            <div className="register">
                <h1>Fill in quick registration form!</h1>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="userName">Enter your user name:</label>
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
                    <label htmlFor="password">Enter your password:</label>
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
                    <label htmlFor="passwordRepeat">Repeat your password:</label>
                    <input 
                        type="password"
                        id="passwordRepeat"
                        name="passwordRepeat"
                        value={formik.values.passwordRepeat}
                        placeholder="Repeat password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {
                    formik.touched.passwordRepeat && formik.errors.passwordRepeat && <span>{formik.errors.passwordRepeat}</span>
                    }
                    <label htmlFor="email">Enter your email:</label>
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
                    <label htmlFor="avatar">Enter your avatars url:</label>
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
                    <input type="submit" value="Register" className="primary-btn"/>
                </form>
            </div>
        </StyledSection>
     );
}

export default Register;