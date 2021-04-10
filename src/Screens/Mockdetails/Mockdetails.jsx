import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import "./Mockdetails.css";
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Circularloader from "../../Components/Circularloader/Circularloader";
import {GrClose} from "react-icons/gr";
import MuiAlert from '@material-ui/lab/Alert';
import { AppBar, IconButton, makeStyles, Snackbar, Toolbar, Typography } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Mockdetails = () => {

    const useStyles = makeStyles((theme) => ({
        appBar: {
          position: 'relative',
        },
        title: {
          marginLeft: theme.spacing(2),
          flex: 1,
        },
      }));


    const classes = useStyles();
    const proxy = "http://localhost:5000";
    const param = useParams()
    const [snakbarOpen , setSnakbarOpen] = useState(false);
    const [snakbarMsg , setSnakbarMsg] = useState(null);
    const [severitY , setSeveritY] = useState(null);
    const [questionCategory, setQuestionCategory] = useState("english")
    const [allQuestion, setAllQuestion] = useState([]);
    const [noQuestion, setnoQuestion] = useState(null);
    const [counter,setCounter] = useState(0)
    const [questionByCategory , setQuestionByCategory] = useState([])
    const [renderingQuestion , setRenderingQuestion] = useState(null)
    const [open, setOpen] = useState(false);
    const [updateQuestion , setUpdateQuestion] = useState({
        questionPassage: "",
        questionName: "",
        questionOptionOne: "",
        questionOptionTwo: "",
        questionOptionThree: "",
        questionOptionFour: "",
        correctOption: ""
    })

    

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
                setnoQuestion(`${err.response.data.message}`)
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

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

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
        setUpdateQuestion({
            questionPassage: `${renderedQuestion.questionPassage}`,
            questionName: `${renderedQuestion.questionName}`,
            questionOptionOne: `${renderedQuestion.questionOptionOne}`,
            questionOptionTwo: `${renderedQuestion.questionOptionTwo}`,
            questionOptionThree: `${renderedQuestion.questionOptionThree}`,
            questionOptionFour: `${renderedQuestion.questionOptionFour}`,
            correctOption: `${renderedQuestion.correctOption}`
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateQuestion = () => {
        var updateQuestionId = renderingQuestion._id;
        try {
            axios.put(`${proxy}/myclat/admins/updatequestion/${updateQuestionId}`, {updateQuestion}).then((res) => {
                if(res.status === 200){
                    setSnakbarMsg(`${res.data.message}`)
                    setSeveritY("success")
                    setSnakbarOpen(true)
                }
            }).catch((err) => {
                if(err.response.status === 401){
                    setSnakbarMsg(`${err.response.data.message}`)
                    setSeveritY("error")
                    setSnakbarOpen(true)
                }
                // console.log(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    if(noQuestion) {
        return(
            <center style={{marginTop: "5rem"}}>
                <h1>{noQuestion}</h1>
            </center>
        )
    }

    return (
        <>
        {renderingQuestion && 
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <GrClose id="closeUpdateIcon" />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Update Question
                    </Typography>
                </Toolbar>
            </AppBar>
        <div className="addquestion">
                <div className="questionName">
                    <label>Question Passage</label>
                    <textarea rows="12" value={updateQuestion.questionPassage} onChange={(e) => setUpdateQuestion({...updateQuestion, questionPassage: e.target.value})}></textarea>
                    <label>Question Name</label>
                    <input value={updateQuestion.questionName} type="text" onChange={(e) => setUpdateQuestion({...updateQuestion, questionName: e.target.value})} />
                </div>
                <div className="questionOptions">
                    <label>Option (a)</label>
                    <input type="text" value={updateQuestion.questionOptionOne} onChange={(e) => setUpdateQuestion({...updateQuestion, questionOptionOne: e.target.value})} required/>
                    <label>Option (b)</label>
                    <input type="text" value={updateQuestion.questionOptionTwo} onChange={(e) => setUpdateQuestion({...updateQuestion, questionOptionTwo: e.target.value})} required/>
                    <label>Option (c)</label>
                    <input type="text" value={updateQuestion.questionOptionThree} onChange={(e) => setUpdateQuestion({...updateQuestion, questionOptionThree: e.target.value})} required/>
                    <label>Option (d)</label>
                    <input type="text" value={updateQuestion.questionOptionFour} onChange={(e) => setUpdateQuestion({...updateQuestion, questionOptionFour: e.target.value})} required/>
                    <label htmlFor="correctoption">Correct Option</label>
                    <select name="correctoption" value={updateQuestion.correctOption} onChange={(e) => setUpdateQuestion({...updateQuestion, correctOption: e.target.value})}>
                        <option value="questionOptionOne" >Option (a)</option>
                        <option value="questionOptionTwo">Option (b)</option>
                        <option value="questionOptionThree">Option (c)</option>
                        <option value="questionOptionFour">Option (d)</option>
                    </select>
                </div>
            </div>
            <div className="questionUpdateBtnGrp">
                <button className="updateCloseBtn" onClick={handleClose}>Close</button>
                {!updateQuestion.questionPassage || !updateQuestion.questionName || !updateQuestion.questionOptionOne || !updateQuestion.questionOptionTwo || !updateQuestion.questionOptionThree || !updateQuestion.questionOptionFour || !updateQuestion.correctOption ?
                <button className="updateBtn" style={{pointerEvents: "none", opacity: "0.7"}} >Update</button> :
                <button className="updateBtn" onClick={handleUpdateQuestion}>Update</button>
               }

            </div>
        </Dialog>
        }
        <Snackbar anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            open={snakbarOpen} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severitY}>
            {snakbarMsg ? snakbarMsg : null}
            </Alert>
        </Snackbar>
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