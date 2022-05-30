import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/memberinicialcreate.css"

const MemberInicialCreate = (props) => {
    const [member, setMember] = useState({
        name: '',
        email: ''
    });
    const [membersGroup, setMembersGroup] = useState([]);

    const params = useParams();

    const _handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/groups/${ params.id }/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member),
        })
        .then((resp) => resp.json())
        .then((members) => setMembersGroup(members))
        setMember({name: '', email: ''})
    };

    const _handleChange = (event) => {
        setMember((prevMember) => ({
            ...prevMember, [event.target.name]: event.target.value
        })
    )};
    
    return(
        <div className="container">
            <p className="title">Add members to your group XXXX</p>
            <div>
                <p>Don't forget to add yourself;</p>
                <p>Don't you worry to much, after you can change (add or delete) members of the group</p>
            </div>

            <div className="form-container">
                <form onSubmit={_handleSubmit}>
                    <input name="name" value={member.name} required className="form-control"
                        onChange={_handleChange} placeholder="Name" />
                    <input name="email" value={member.email} type="email" className="form-control"
                        onChange={_handleChange} placeholder="Email (optional)" />

                    <button className="btn btn-primary btn-lg btn-block">+ member</button>
                </form>
            </div>

            <div className="table-container">
                <table className="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {membersGroup.map((member) => {
                            return  <tr key={member.id}>
                                        <td>{member.name}</td>
                                        <td>{member.email}</td>
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>

            <Link to={`/groups/${ params.id }`}>
                <button className="btn btn-primary btn-lg btn-block">GO TO YOUR DASHBOARD</button>
            </Link>
        </div>
    );
};

export default MemberInicialCreate;