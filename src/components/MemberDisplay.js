import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/style.css"

const MemberDisplay = (props) => {
    const [membersGroup, setMembersGroup] = useState([]);

    // console.log(membersGroup)

    const params = useParams();
    // console.log(params)

    useEffect(() => {
        fetch(`http://localhost:3000/groups/${ params.group_id }/members`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((members) => setMembersGroup(members))
    }, []);
    
    return(
        <div>
            {membersGroup.map((member) => (
                <div key={member.id}>
                    <p>{member.name}</p>
                </div>
            ))}

            <Link to={`/groups/${ id }/members`}>
                <button>Add member</button>
            </Link>
        </div>
    );
};

export default MemberDisplay;