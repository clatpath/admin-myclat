import React from 'react';
import { useHistory } from 'react-router';
import "./Homepage.css";
import { HomeData } from './HomepageData';

const Homepage = () => {
    const history = useHistory();

    const handleCardPath = (path) => {
        history.push(path);
    }

    return (
        <div className="homepage">
            <div className="CardSection">
            {HomeData ? HomeData.map((singleData)=>{
                return(
                        <div className="Card" key={singleData.id} onClick={() => handleCardPath(singleData.path)} >
                            <div className="cardHeader">
                                {singleData.icon}
                            </div>
                            <p>{singleData.name}</p>     
                        </div>
                )
            }): ""}
            </div>
        </div>
    );
};

export default Homepage;