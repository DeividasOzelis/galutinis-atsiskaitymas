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

function EditAnswerModal() {

    const time = new Intl.DateTimeFormat('lt-LT', {
        timeStyle: "short",
        dateStyle: "short"
    }).format(new Date());   

    const { editAnswerModal, setEditAnswerModal, editAnswer } = useContext(DataContext);   

    const formik = useFormik({
        initialValues: {
            answer: ""
        },
        onSubmit: values => {
            formik.resetForm();

            const editedAnswer = {
                id: editAnswerModal.id,
                questionId: editAnswerModal.questionId,
                answer: formik.values.answer,
                userId: editAnswerModal.userId,
                date: editAnswerModal.date,
                edited: [time]
            };
            editAnswer(editedAnswer);
            setEditAnswerModal(false);
        },
        validationSchema: Yup.object({
            answer: Yup.string()
                .min(10, "Must contain 10 symbols at least!")
                .max(500, "Max 500 symbols!")
                .required("This field must be filled!")
                .trim()
        })
    })

    useEffect(() => {
       if(editAnswerModal){
        formik.setValues({
            answer: editAnswerModal.answer
        })
       }
       // eslint-disable-next-line 
    }, [editAnswerModal, formik.setValues]);
    
    if(editAnswerModal){
        document.body.classList.add('active-modal3')
      }else{
        document.body.classList.remove('active-modal3')
    };

    if(!editAnswerModal)  return null

    return ( 
        <>
            <div className="overlay"></div>
            <StyledModal className="modal">
                <button onClick={() => {setEditAnswerModal(false); formik.resetForm()}} className="primary-btn">×</button>
                <h1>Edit your answer!</h1>
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

export default EditAnswerModal;