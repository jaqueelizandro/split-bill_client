import React from "react";
import { useNavigate } from "react-router-dom";

const Group = (props) => {
    const navigate = useNavigate();

    const _handleClick = () => {
        navigate(`/groups`);
    }
    
    return(
        <button onClick={_handleClick}>Start a group</button>
    );
};

export default Group;