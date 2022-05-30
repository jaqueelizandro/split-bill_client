import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/style.css"

const Group = (props) => {
    const navigate = useNavigate();

    const _handleClick = () => {
        navigate(`/groups`);
    }
    
    return(
        <div className="container">
            <p className="title">Welcome to <span className="logo">/div</span></p>
            <button type="button" className="btn btn-primary btn-lg btn-block"
                onClick={_handleClick}>
                    Start a group
            </button>
            <p className="about">some text here explain the application</p>
        </div>
    );
};

export default Group;