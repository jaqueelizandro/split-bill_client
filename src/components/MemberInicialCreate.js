import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

const MemberInicialCreate = (props) => {
    const params = useParams();
    const location = useLocation();

    const [member, setMember] = useState({
        name: '',
        email: ''
    });
    const [membersGroup, setMembersGroup] = useState([]);

    const _handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${ process.env.BACKEND_HOST}/groups/${ params.group_id }/members`, {
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

    if (membersGroup.length > 0) {
        return(
            <div className="container">
                <p className="title3">Add members to</p>
                <p className="title3">{(location.state.name).toUpperCase()}</p>
                <div className="about">
                    <ul className="about-list">
                        <li>Don't forget to add yourself.</li>
                        <li>And don't you worry to much, after you can add, edit and delete members of the group.</li>
                    </ul>
                </div>
    
                <div className="container2">
                    <form onSubmit={_handleSubmit}>
                        <input name="name" value={member.name} required className="form-control"
                            onChange={_handleChange} placeholder="Name" />
                        <input name="email" value={member.email} type="email" className="form-control"
                            onChange={_handleChange} placeholder="Email (optional)" />
    
                        <button className="btn btn-light btn-lg btn-block">+ member</button>
                    </form>
                </div>
                
                <div className="container2">
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
                
                <div className="container2">
                    <Link to={`/groups/${ params.group_id }`}>
                        <button className="btn btn-light btn-lg btn-block">GO TO YOUR DASHBOARD</button>
                    </Link>
                </div>
            </div>
        );
    } else {
        return(
            <div className="container">
                <p className="title3">Add members to</p>
                <p className="title3">{(location.state.name).toUpperCase()}</p>
                <div className="about">
                    <ul className="about-list">
                        <li>Don't forget to add yourself.</li>
                        <li>And don't you worry to much, after you can add, edit and delete members of the group.</li>
                    </ul>
                </div>
    
                <div className="container2">
                    <form onSubmit={_handleSubmit}>
                        <input name="name" value={member.name} required className="form-control"
                            onChange={_handleChange} placeholder="Name" />
                        <input name="email" value={member.email} type="email" className="form-control"
                            onChange={_handleChange} placeholder="Email (optional)" />
    
                        <button className="btn btn-light btn-lg btn-block">+ member</button>
                    </form>
                </div>
            </div>
    )}
    

};

export default MemberInicialCreate;