import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Group = (props) => {
    const [group, setGroup] = useState('');
    const navigate = useNavigate();

    const _handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: group }),
        })
        .then((resp) => resp.json())
        .then((result) => navigate(`/groups/${ result.id }/members`))
    };
    
    return(
        <form onSubmit={_handleSubmit}>
            <input placeholder="Name the group"
                onChange={(e) => setGroup(e.target.value)} />
            <button>+ group</button>
        </form>
    );
};

export default Group;