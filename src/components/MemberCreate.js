import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MemberCreate = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    const [member, setMember] = useState({
        name: '',
        email: ''
    });

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
        <div className="form-container">
            <form onSubmit={_handleSubmit}>
                <input name="name" value={member.name} required className="form-control"
                    onChange={_handleChange} placeholder="Name" />
                <input name="email" value={member.email} type="email" className="form-control"
                    onChange={_handleChange} placeholder="Email (optional)" />

                <button className="btn btn-primary btn-lg btn-block">+ member</button>
            </form>
        </div>
    );
};

export default MemberCreate;