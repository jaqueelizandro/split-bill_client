import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const MemberDisplay = (props) => {
    const [membersGroup, setMembersGroup] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3000/groups/${ id }/members`, {
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