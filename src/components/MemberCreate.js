import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MemberCreate = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    console.log(params)

    const [member, setMember] = useState({
        name: '',
        email: ''
    });

    const _handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/groups/${ params.group_id }/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member),
        })
        .then((resp) => resp.json())
        .then((result) => navigate(`/groups/${ params.group_id }/members`))
    };

    const _handleChange = (event) => {
        setMember((prevMember) => ({
            ...prevMember, [event.target.name]: event.target.value
        })
    )};

    const _handleClick = () => {
        navigate(`/groups/${ params.group_id }/members`);
    }
    
    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New members</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={_handleClick}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={_handleSubmit}>
                            <input name="name" value={member.name} required className="form-control"
                                onChange={_handleChange} placeholder="Name" />
                            <input name="email" value={member.email} type="email" className="form-control"
                                onChange={_handleChange} placeholder="Email (optional)" />

                            <button className="btn btn-light btn-lg btn-block">+ member</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberCreate;