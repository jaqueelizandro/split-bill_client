import React from "react";
import { useNavigate } from "react-router-dom";

const Group = (props) => {
    const navigate = useNavigate();

    const _handleClick = () => {
        navigate(`/groups`);
    }
    
    return(
        <div className="container">
            <p className="title">sp/it</p>
            <button type="button" className="btn btn-light btn-lg btn-block"
                onClick={_handleClick}>
                    Start a group
            </button>
            <div className="about">
                <ul className="about-list">
                    <li>Split expenses with your friends.</li>
                    <li>Add bills and keep track of who owes who.</li>
                    <li>Create a group, add the members and share the link group.</li>
                    <li>No Sign-up.</li>
                </ul>
            </div>
        </div>
    );
};

export default Group;