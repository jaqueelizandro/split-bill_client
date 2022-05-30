import React, { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const MemberCreate = (props) => {
    const [member, setMember] = useState({
        name: '',
        email: ''
    });
    const navigate = useNavigate();

    const params = useParams();

    const _handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/groups/${ params.groups_id }/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member),
        })
        .then((resp) => resp.json())
        .then((result) => navigate(-1))
    };

    const _handleChange = (event) => {
        setMember((prevMember) => ({
            ...prevMember, [event.target.name]: event.target.value
        })
    )};
    
    return(
        <div>
            <form onSubmit={_handleSubmit}>
                <p>New member</p>
                <input name="name" value={member.name} required
                    onChange={_handleChange} placeholder="Name" />
                <input name="email" value={member.email} type="email" 
                    onChange={_handleChange} placeholder="Email (optional)" />

                <button>Save</button>
            </form>
        </div>
    );
};

export default MemberCreate;