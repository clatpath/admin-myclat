import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import "./Mockdetails.css";
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Circularloader from "../../Components/Circularloader/Circularloader";

const Mockdetails = () => {
    const proxy = "http://localhost:5000";
    const param = useParams()
    const [questionCategory, setQuestionCategory] = useState("english")
    const [allQuestion, setAllQuestion] = useState([]);
    const [counter,setCounter] = useState(0)
    const [questionByCategory , setQuestionByCategory] = useState([])
    const [renderingQuestion , setRenderingQuestion] = useState(null)
    const [open, setOpen] = useState(false);
    const [question , setQuestion] = useState({
        category : "",
        questionPassage: "",
        questionName: "",
        questionOptionOne: "",
        questionOptionTwo: "",
        questionOptionThree: "",
        questionOptionFour: "",
        correctOption: "",
        mockSetId: ""
    })

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    useEffect(() => {
        //do something
        var mockId = param.id;
        try {
            axios.get(`${proxy}/myclat/admins/questionset`,{
                params: {
                  ID: mockId
                }}).then((res)=> {
                    setAllQuestion(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        setCounter(0)
        const questionsetbycategory = []
        allQuestion.forEach((question , i) =>{
            if(question.category === questionCategory){
                questionsetbycategory.push(question);
            }
        })
        setQuestionByCategory(questionsetbycategory)
    }, [questionCategory, allQuestion])

    useEffect(() => {
        questionByCategory.forEach((ques,i) => {
            if(counter === i){
                setRenderingQuestion(ques)
            }
        })
        // console.log(questionByCategory)
    }, [counter, allQuestion, questionCategory, questionByCategory])
    
    const handlePreV = () => {
        if(counter > 0){
            setCounter((preV) => preV - 1)
        }
        
    }
    const handleNext = () => {
        if(counter < questionByCategory.length-1){
            setCounter((preV) => preV + 1)
        }
    }

    const handleCounter = (index) => {
        setCounter(index)
    }

    const handleEdit = (renderedQuestion) => {
        console.log(renderedQuestion)
        setOpen(true);

    }

  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <>
        {renderingQuestion && 
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <div className="addquestion">
                <div className="questionName">
                    <label>Question Passage</label>
                    <textarea rows="12" value={renderingQuestion.questionPassage} onChange={(e) => setQuestion({...question, questionPassage: e.target.value})}></textarea>
                    <label>Question Name</label>
                    <input value={renderingQuestion.questionName} type="text" onChange={(e) => setQuestion({...question, questionName: e.target.value})} />
                </div>
                <div className="questionOptions">
                    <label>Option (a)</label>
                    <input type="text" value={renderingQuestion.questionOptionOne} onChange={(e) => setQuestion({...question, questionOptionOne: e.target.value})} required/>
                    <label>Option (b)</label>
                    <input type="text" value={renderingQuestion.questionOptionTwo} onChange={(e) => setQuestion({...question, questionOptionTwo: e.target.value})} required/>
                    <label>Option (c)</label>
                    <input type="text" value={renderingQuestion.questionOptionThree} onChange={(e) => setQuestion({...question, questionOptionThree: e.target.value})} required/>
                    <label>Option (d)</label>
                    <input type="text" value={renderingQuestion.questionOptionFour} onChange={(e) => setQuestion({...question, questionOptionFour: e.target.value})} required/>
                    <label htmlFor="correctoption">Correct Option</label>
                    <select name="correctoption" value={renderingQuestion.correctOption} onChange={(e) => setQuestion({...question, correctOption: e.target.value})}>
                        <option value="questionOptionOne" >Option (a)</option>
                        <option value="questionOptionTwo">Option (b)</option>
                        <option value="questionOptionThree">Option (c)</option>
                        <option value="questionOptionFour">Option (d)</option>
                    </select>
                </div>
            </div>
            <button onClick={handleClose}>Close</button>
            <button>Save</button>
        </Dialog>
        }
        
        {!renderingQuestion && <Circularloader />}
        {renderingQuestion &&
        <div className="mockDetails">
        <div className="questioncategory">
            <label htmlFor="mockCategory">Subject</label>
             <select name="mockCategory" onChange={(e) => setQuestionCategory(e.target.value)} >
                 <option value="english" selected>English</option>
                 <option value="General Knowledge">General Knowledge</option>
                 <option value="Logical Reasoning">Logical Reasoning</option>
                 <option value="Legal Reasoning">Legal Reasoning</option>
                 <option value="Quantitative Techniques">Quantitative Techniques</option>
             </select>
        </div>
        <div className="questionsdetails">
            <div className="questionsection">
                <div className="question">
                    <h3>Question Passage</h3>
                    <p className="questionpassage">{renderingQuestion.questionPassage}</p>
                    <h4>Quesion {counter + 1}</h4>
                    <p>{renderingQuestion.questionName}</p>
                </div>
                <div className="options">
                    <ul>
                        <li>(A) {renderingQuestion.questionOptionOne}</li>
                        <li>(B) {renderingQuestion.questionOptionTwo}</li>
                        <li>(C) {renderingQuestion.questionOptionThree}</li>
                        <li>(D) {renderingQuestion.questionOptionFour}</li>
                    </ul>
                    {renderingQuestion.correctOption === "questionOptionOne" && <p>Correct Option: (A) </p>}
                    {renderingQuestion.correctOption === "questionOptionTwo" && <p>Correct Option: (B) </p>}
                    {renderingQuestion.correctOption === "questionOptionThree" && <p>Correct Option: (C) </p>}
                    {renderingQuestion.correctOption === "questionOptionFour" && <p>Correct Option: (D) </p>}
                </div>
            </div>
            <div className="btnsection">
                <p>Total Questions</p>
                <div className="numbersection">
                    {questionByCategory && questionByCategory.map((q ,i) => {
                        return (
                            <>
                            <span key={i} onClick={() => handleCounter(i)} >{i+1}</span>
                            </>
                        )
                    })}
                </div>
                <div className="btnGrp">
                     <button className="ediBtn" onClick={()=> handleEdit(renderingQuestion)}>Edit</button>
                     <button className="prevBtn" onClick={handlePreV}>Previous</button>
                     <button className="nextBtn" onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>
     </div>
        }
        
    </>
    );
};

export default Mockdetails;