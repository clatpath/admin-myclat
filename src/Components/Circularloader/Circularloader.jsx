import React from 'react';
import "./Circularloader.css";
import { CircularProgress } from '@material-ui/core';

const Circularloader = () => {
    return (
        <div className="loaderScreen">
            <div className="progress">
                <CircularProgress />
            </div>
        </div>
    );
};

export default Circularloader;