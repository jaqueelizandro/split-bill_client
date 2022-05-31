import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const MemberDisplay = (props) => {
    const params = useParams();

    const [membersGroup, setMembersGroup] = useState([]);

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
            <div className="table-container">
                {membersGroup.map((member) => (
                    <Link to={`/groups/${params.group_id}/members/${member.id}`} key={member.id} state={ member } >
                        <button className="btn btn-primary btn-lg btn-block btn-display">
                            <p>{member.name}</p>
                            <p>{member.email}</p>
                        </button>
                    </Link>
                ))}
            </div>

            <Link to={`/groups/${ params.id }/members/new`}>
                <button className="btn btn-primary btn-lg btn-block">+ member</button>
            </Link>
        </div>
    );
};

export default MemberDisplay;

