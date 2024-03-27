import { useContext } from "react";
import DataContext from "../contexts/DataContext";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';


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

function AnswerModal() {

    const time = new Intl.DateTimeFormat('lt-LT', {
        timeStyle: "short",
        dateStyle: "short"
    }).format(new Date());   

    const { openModal, setOpenModal, logedInUser, createAnswer } = useContext(DataContext);
    

    const formik = useFormik({
        initialValues: {
            answer: ""
        },
        onSubmit: values => {
            formik.resetForm();
            const newAnswer = {
                id: uuidv4(),
                questionId: openModal.id,
                answer: formik.values.answer,
                userId: logedInUser.id,
                date: `${time}`
            };
            createAnswer(newAnswer);
            setOpenModal(false);
        },
        validationSchema: Yup.object({
            answer: Yup.string()
                .min(10, "Must contain 10 symbols at least!")
                .max(500, "Max 500 symbols!")
                .required("This field must be filled!")
                .trim()
        })
    })

    
    
    if(openModal){
        document.body.classList.add('active-modal2')
      }else{
        document.body.classList.remove('active-modal2')
    };

    if(!openModal)  return null

    

    return ( 
        <>
            <div className="overlay"></div>
            <StyledModal className="modal">
                <button onClick={() => {setOpenModal(false); formik.resetForm()}} className="primary-btn">×</button>
                <h1>Create your answer!</h1>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="answer">Your answer: </label>
                    <textarea 
                        name="answer" 
                        id="answer" 
                        cols="30" 
                        rows="10"
                        placeholder="Your answer"
                        value={formik.values.answer}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                    >
                    </textarea>
                    {
                        formik.touched.answer && formik.errors.answer && <span>{formik.errors.answer}</span>
                    }
                    <input type="submit" value="Post!" className="primary-btn"/>
                </form>
            </StyledModal>
        </>
     );
}

export default AnswerModal;