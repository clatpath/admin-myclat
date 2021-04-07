import React, { useEffect, useState } from 'react';
import "./Card.css";

const Card = (props) => {
    const {name , status} = props


    return (
        <>
          <div className="card">
                <div className="cardHead">
                    <span>Mock Name</span>
                    <h2>{name ? name : ""}</h2>
                </div>
                    {status ? 
                    <div className="cardBody">
                        <div className="statusOnline"></div>
                        <p>Online</p>
                    </div> : 
                    <div className="cardBody">
                        <div className="statusOfline"></div>
                        <p>offline</p>
                    </div> }   
            </div>  
        </>
    );
};

export default Card;