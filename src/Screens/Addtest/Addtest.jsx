import { LinearProgress, Snackbar } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import "./Addtest.css";
import MuiAlert from '@material-ui/lab/Alert';

const Addtest = () => {
    const [loading , setLoading] = useState(false);
    const [snakbarOpen , setSnakbarOpen] = useState(false);
    const [snakbarMsg , setSnakbarMsg] = useState(null);
    const [severitY , setSeveritY] = useState(null);
    const [mockSetToggle , setMockSetToggle] = useState(true)
    const [mockSetName , setMockSetName] = useState({name: "" , visibility: false});
    const [question , setQuestion] = useState({
        category : "",
        questionName: "",
        questionOptionOne: "",
        questionOptionTwo: "",
        questionOptionThree: "",
        questionOptionFour: "",
        correctOption: "",
        mockSetName: ""
    })
    const proxy = "http://localhost:5000";

    const createMockSetHandler = () => {
        var mocksetname = mockSetName.name.toUpperCase()
        setMockSetName({name: mocksetname, visibility:true})
        setMockSetToggle(false)
        setLoading(true)
        try {
            axios.post(`${proxy}/myclat/admins/createmockset`, {mocksetname}).then((res) => {
                setSnakbarMsg(res.data.message)
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
        // setQuestion({...question, mockSetName:mockSetName.name});
        try{
            axios.post(`${proxy}/myclat/admins/createquestion`, question).then((res)=> {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }catch(error){
            console.log(error)
        }
    }

    console.log(question, "question")

    return (
        <div className="addtestpage">
            {loading ? <LinearProgress />: null}
            <Snackbar anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            open={snakbarOpen} autoHideDuration={5000} onClose={handleClose}>
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
                <div className="mockcategory">
                <label htmlFor="mockCategory">Mock Category:-</label>
                <select name="mockCategory" onChange={(e) => setQuestion({...question, category: e.target.value, mockSetName:mockSetName.name})}>
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
                <label>Question Name</label>
                <textarea cols="5" rows="5" onChange={(e) => setQuestion({...question, questionName: e.target.value, mockSetName:mockSetName.name})}></textarea>
                <label>Option (a)</label>
                <input type="text" onChange={(e) => setQuestion({...question, questionOptionOne: e.target.value, mockSetName:mockSetName.name})} required/>
                <label>Option (b)</label>
                <input type="text" onChange={(e) => setQuestion({...question, questionOptionTwo: e.target.value, mockSetName:mockSetName.name})} required/>
                <label>Option (c)</label>
                <input type="text" onChange={(e) => setQuestion({...question, questionOptionThree: e.target.value, mockSetName:mockSetName.name})} required/>
                <label>Option (d)</label>
                <input type="text" onChange={(e) => setQuestion({...question, questionOptionFour: e.target.value, mockSetName:mockSetName.name})} required/>
                <label htmlFor="correctoption">Correct Option</label>
                <select name="correctoption" onChange={(e) => setQuestion({...question, correctOption: e.target.value, mockSetName:mockSetName.name})}>
                <option value="none" selected disabled hidden>
                    Select an Option
                    </option>
                    <option value="questionOptionOne" >Option (a)</option>
                    <option value="questionOptionTwo">Option (b)</option>
                    <option value="questionOptionThree">Option (c)</option>
                    <option value="questionOptionFour">Option (d)</option>
                </select>
            </div>
            <div className="testBtnGrp">
                <button className="addquestionBtn" onClick={addQuestionHandler}>Add Question</button>
                <button className="resetfieldBtn">Reset Fields</button>
            </div>

            </>
            }
        </div>
    );
};


export default Addtest;