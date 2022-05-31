import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Group = (props) => {
    const navigate = useNavigate();

    const [group, setGroup] = useState('');

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
        .then((result) => navigate(`/groups/${ result.id }/inicialmembers`, {state: result}))
    };
    
    return(
        <div className="container">
            <p className="title2">sp/it</p>
            <div className="container2">
                <form onSubmit={_handleSubmit}>
                    <input placeholder="Enter your group name" className="form-control" required
                        onChange={(e) => setGroup(e.target.value)} />
                    <button className="btn btn-light btn-lg btn-block">+ group</button>
                </form>
            </div>
        </div>
    );
};

export default Group;