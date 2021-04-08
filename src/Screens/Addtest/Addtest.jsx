import { LinearProgress, Snackbar } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Addtest.css";
import MuiAlert from '@material-ui/lab/Alert';

const Addtest = () => {
    const [loading , setLoading] = useState(false);
    const [counter , setCounter] = useState(0)
    const [snakbarOpen , setSnakbarOpen] = useState(false);
    const [snakbarMsg , setSnakbarMsg] = useState(null);
    const [severitY , setSeveritY] = useState(null);
    const [mockSetToggle , setMockSetToggle] = useState(true)
    const [mockSetName , setMockSetName] = useState({name: "" , visibility: false});
    const [mocksetId , setMocksetId] = useState(null);
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
    const proxy = "http://localhost:5000";

    useEffect(() => {
        setQuestion({...question, mockSetId: mocksetId})
    },[mocksetId])

    const createMockSetHandler = () => {
        var mocksetname = mockSetName.name.toUpperCase()
        setMockSetName({...mockSetName, name: mocksetname, visibility:true})
        setMockSetToggle(false)
        setLoading(true)
        try {
            axios.post(`${proxy}/myclat/admins/createmockset`, {mocksetname}).then((res) => {
                setSnakbarMsg(res.data.message)
                setMocksetId(res.data.newMocksetName._id)
                setSeveritY("success")
                setSnakbarOpen(true)
            }).catch(err => {
                console.log(err)
                setSnakbarMsg("Error! Try again later")
                setSeveritY("error")
                setSnakbarOpen(true)
            })
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
    const handleClose = () => {
        setSnakbarOpen(false)
    }

    const addQuestionHandler = () => {
        setLoading(true)
        // setQuestion({...question, mockSetName:mockSetName.name});
        if(!question.category || !question.questionName || !question.questionPassage || !question.questionOptionOne || !question.questionOptionThree || !question.questionOptionTwo || !question.questionOptionFour || !question.correctOption){
            return  (
            setSnakbarMsg("Error! Please Fill all option"),
            setSeveritY("error"),
            setSnakbarOpen(true),
            setLoading(false)
            )
        }
        try{
            axios.post(`${proxy}/myclat/admins/createquestion`, question).then((res)=> {
                setSnakbarMsg(res.data)
                setSeveritY("success")
                setSnakbarOpen(true)
                setCounter(prev => prev + 1);
                setQuestion({...question,
                    questionName: "",
                    questionOptionOne: "",
                    questionOptionTwo: "",
                    questionOptionThree: "",
                    questionOptionFour: "",
                    });
                console.log(res)
            }).catch((err) => {
                console.log(err)
                setSnakbarMsg("Error! Try again later")
                setSeveritY("error")
                setSnakbarOpen(true)
            })
        }catch(error){
            console.log(error)
        }
        setLoading(false)
    }

    const resetHandler = () => {
        setQuestion({...question,
        questionPassage: "",
        questionName: "",
        questionOptionOne: "",
        questionOptionTwo: "",
        questionOptionThree: "",
        questionOptionFour: "",
        })
    }


    return (
        <div className="addtestpage">
            {loading ? <LinearProgress />: null}
            <Snackbar anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            open={snakbarOpen} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severitY}>
            {snakbarMsg ? snakbarMsg : null}
            </Alert>
            </Snackbar>
            <div className="mocksetname">
                <label>Mock Set Name</label>
                <h2>{mockSetName && mockSetName.visibility === true ? mockSetName.name : ""}</h2>
                {mockSetToggle && <div className="mocksetnamefields">
                <input type="text" onChange={(e) => setMockSetName({...mockSetName , name: e.target.value})} />
                <button className="mocksetBtn" onClick={createMockSetHandler}>Create Mock Set</button></div>
                    }
            </div>
            {!mockSetToggle && <>
                <div className="showCounter">
                    <p>( {counter} ) Question Added to MockSet [{mockSetName.name}]</p>
                </div>
                <div className="mockcategory">
                <label htmlFor="mockCategory">Mock Category:-</label>
                <select name="mockCategory" onChange={(e) => setQuestion({...question, category: e.target.value})}>
                <option value="none" selected disabled hidden>
                    Select an Option
                    </option>
                    <option value="english">English Language</option>
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="Logical Reasoning">Logical Reasoning</option>
                    <option value="Legal Reasoning">Legal Reasoning</option>
                    <option value="Quantitative Techniques">Quantitative Techniques</option>
                </select>
            </div>
            <div className="addquestion">
                <div className="questionName">
                    <label>Question Passage</label>
                    <textarea rows="12" value={question.questionPassage} onChange={(e) => setQuestion({...question, questionPassage: e.target.value})}></textarea>
                    <label>Question Name</label>
                    <input value={question.questionName} type="text" onChange={(e) => setQuestion({...question, questionName: e.target.value})} />
                </div>
                <div className="questionOptions">
                    <label>Option (a)</label>
                    <input type="text" value={question.questionOptionOne} onChange={(e) => setQuestion({...question, questionOptionOne: e.target.value})} required/>
                    <label>Option (b)</label>
                    <input type="text" value={question.questionOptionTwo} onChange={(e) => setQuestion({...question, questionOptionTwo: e.target.value})} required/>
                    <label>Option (c)</label>
                    <input type="text" value={question.questionOptionThree} onChange={(e) => setQuestion({...question, questionOptionThree: e.target.value})} required/>
                    <label>Option (d)</label>
                    <input type="text" value={question.questionOptionFour} onChange={(e) => setQuestion({...question, questionOptionFour: e.target.value})} required/>
                    <label htmlFor="correctoption">Correct Option</label>
                    <select name="correctoption" onChange={(e) => setQuestion({...question, correctOption: e.target.value})}>
                    <option value="none"  selected disabled hidden>
                        Select an Option
                        </option>
                        <option value="questionOptionOne" >Option (a)</option>
                        <option value="questionOptionTwo">Option (b)</option>
                        <option value="questionOptionThree">Option (c)</option>
                        <option value="questionOptionFour">Option (d)</option>
                    </select>
                </div>
                
            </div>
            <div className="testBtnGrp">
                <button className="addquestionBtn" onClick={addQuestionHandler}>Add Question</button>
                <button className="resetfieldBtn" onClick={resetHandler}>Reset Fields</button>
            </div>

            </>
            }
        </div>
    );
};


export default Addtest;