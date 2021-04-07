import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Card from '../../Components/Card/Card';
import Circularloader from '../../Components/Circularloader/Circularloader';
import "./Viewmocks.css";

const Viewmocks = () => {
    const history = useHistory()
    const proxy = "http://localhost:5000"
    const [allMocks , setAllMocks] = useState(null);

    useEffect(() => {
        try {
            axios.get(`${proxy}/myclat/admins/viewmockset`).then((res)=> {
                setAllMocks(res.data.mock)
            }).catch((err)=> {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
        
    },[]);

    if(!allMocks) {
        return ( <Circularloader />)
    }

    const handleCardClick = (id) => {
        history.push(`/viewmocks/${id}`)
    }

    console.log(allMocks)
    return (
        <>
        <div className="mockpage">
            {allMocks ? allMocks.map((mock) =>{
                return(
                    <div className="cardContainer" key={mock._id} onClick={()=> handleCardClick(mock._id)}>
                        <Card name={mock.mocksetname} status={mock.online} />
                    </div>
                )
            }): "Something Went Wrong!"}
        </div>
        </>
    );
};

export default Viewmocks;