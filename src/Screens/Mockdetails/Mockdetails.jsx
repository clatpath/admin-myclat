import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import "./Mockdetails.css";

const Mockdetails = () => {
    const param = useParams()
    const [questionCategory, setQuestionCategory] = useState(null)

    useEffect(() => {
        //do something
    })

    return (
        <div className="mockDetails">
           <div className="questioncategory">
               <label>Subject</label>
                <select name="mockCategory" >
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
                       <h3>Question (1)</h3>
                       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sed provident animi quia deserunt repellat error quod placeat dolores, harum, optio suscipit earum voluptas a ea quasi culpa, aut laudantium!</p>
                   </div>
                   <div className="options">
                       <ul>
                           <li>(A) Lorem ipsum dolor, sit amet consectetur adip</li>
                           <li>(B) Lorem ipsum dolor, sit amet consectetur adip</li>
                           <li>(C) Lorem ipsum dolor, sit amet consectetur adip</li>
                           <li>(D) Lorem ipsum dolor, sit amet consectetur adip</li>
                       </ul>
                       <p>Correct Option: (B)</p>
                   </div>
               </div>
               <div className="btnsection">
                   <p>Total Questions</p>
                   <div className="numbersection">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                        <span>11</span>
                        <span>12</span>
                        <span>13</span>
                        <span>14</span>
                        <span>15</span>
                        <span>16</span>
                        <span>17</span>
                        <span>18</span>
                        <span>19</span>
                        <span>20</span>
                        <span>21</span>
                        <span>22</span>
                   </div>
                   <div className="btnGrp">
                        <button className="prevBtn">Previous</button>
                        <button className="nextBtn">Next</button>
                   </div>
               </div>
           </div>
        </div>
    );
};

export default Mockdetails;