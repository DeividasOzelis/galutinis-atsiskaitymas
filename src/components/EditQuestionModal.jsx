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

function EditQuestionModal() {

    const time = new Intl.DateTimeFormat('lt-LT', {
        timeStyle: "short",
        dateStyle: "short"
    }).format(new Date());   

    const { editQuestionModal, setEditQuestionModal, editQuestion } = useContext(DataContext);   

    const formik = useFormik({
        initialValues: {
            subject: "",
            answer: ""
        },
        onSubmit: values => {
            formik.resetForm();

            const editedQuestion = {
                id: editQuestionModal.id,
                subject: formik.values.subject,
                question: formik.values.question,
                userId: editQuestionModal.userId,
                date: editQuestionModal.date,
                edited: [time]
            };
            editQuestion(editedQuestion);
            setEditQuestionModal(false);
        },
        validationSchema: Yup.object({
            subject: Yup.string()
                .required("This field must be filled!")
                .min(5, "Must contain 5 symbols at least!")
                .max(60, "Max 60 symbols!")
                .trim(),
            question: Yup.string()
                .min(10, "Must contain 10 symbols at least!")
                .max(500, "Max 500 symbols!")
                .required("This field must be filled!")
                .trim()
        })
    })

    useEffect(() => {
       if(editQuestionModal){
        formik.setValues({
            subject: editQuestionModal.subject,
            question: editQuestionModal.question
        })
       }
       // eslint-disable-next-line 
    }, [editQuestionModal, formik.setValues]);
    
    if(editQuestionModal){
        document.body.classList.add('active-modal4')
      }else{
        document.body.classList.remove('active-modal4')
    };

    if(!editQuestionModal)  return null

    return ( 
        <>
            <div className="overlay"></div>
            <StyledModal className="modal">
                <button onClick={() => {setEditQuestionModal(false); formik.resetForm()}} className="primary-btn">×</button>
                <h1>Edit your question!</h1>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="subject">Subject up to 60 symbols: </label>
                    <input 
                        type="text" 
                        name="subject" 
                        id="subject"
                        placeholder="Subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.touched.subject && formik.errors.subject && <span>{formik.errors.subject}</span>
                    }
                    <label htmlFor="question">Your question: </label>
                    <textarea 
                        name="question" 
                        id="question" 
                        cols="30" 
                        rows="10"
                        placeholder="Your question"
                        value={formik.values.question}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                    >
                    </textarea>
                    {
                        formik.touched.question && formik.errors.question && <span>{formik.errors.question}</span>
                    }
                    <input type="submit" value="Post!" className="primary-btn"/>
                </form>
            </StyledModal>
        </>
     );
}

export default EditQuestionModal;