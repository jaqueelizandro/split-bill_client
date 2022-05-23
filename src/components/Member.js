import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Members = (props) => {
    const [member, setMember] = useState({
        name: '',
        email: ''
    });
    const [membersGroup, setMembersGroup] = useState([]);

    const { groups_id  } = useParams();

    const _handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/groups/${ groups_id }/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member),
        })
        .then((resp) => resp.json())
        .then((members) => setMembersGroup(members))
        event.target.reset();
    };

    const _handleChange = (event) => {
        setMember(() => ({[event.target.name]: event.target.value})
    )};
    
    return(
        <div>
            <form onSubmit={_handleSubmit}>
                <p>Add members to your group XXXX</p>
                <input name="name" defaultValue="" placeholder="Name"
                    onChange={_handleChange} />
                <input name="email" defaultValue="" type="email" placeholder="Email (optional)"
                    onChange={_handleChange} />

                <button>Create</button>
            </form>


            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
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

            <Link to={`/groups/${ groups_id }`}>
                <button>Go to your dashboard</button>
            </Link>
        </div>
    );
};

export default Members;