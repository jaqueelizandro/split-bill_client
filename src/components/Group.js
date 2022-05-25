import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/group.css"

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
        .then((result) => navigate(`/groups/${ result.id }/inicialmembers`))
    };
    
    return(
        <div className="container">
            <form onSubmit={_handleSubmit}>
                <input placeholder="Enter your group name" className="form-control"
                    onChange={(e) => setGroup(e.target.value)} />
                <button className="btn btn-primary btn-lg btn-block">+ group</button>
            </form>
        </div>
    );
};

export default Group;