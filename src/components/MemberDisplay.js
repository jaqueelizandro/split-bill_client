import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const MemberDisplay = (props) => {
    const params = useParams();

    const [membersGroup, setMembersGroup] = useState([]);

    useEffect(() => {
        fetch(`${ process.env.BACKEND_HOST}/groups/${ params.group_id }/members`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((members) => setMembersGroup(members))
    }, [params.group_id]);
    
    return(
        <div className="container">
            <div>
                <p className="title3">Members</p>
                <Link to={`/groups/${ params.group_id }`} className="link">
                    <button className="btn btn-light" type="button" data-toggle="modal" data-target="#exampleModal">
                        dashboard
                    </button>
                </Link>
                <Link to={`/groups/${ params.group_id }/members/new`} className="link">
                    <button className="btn btn-light" type="button" data-toggle="modal" data-target="#exampleModal">
                        + member
                    </button>
                </Link>
            </div>

            <div className="header">
                <span>Name</span>
                <span>Email</span>
            </div>

            <div className="list">
                { membersGroup.sort((a, b) => b.id - a.id).map((member) => (
                    <Link to={`/groups/${params.group_id}/members/${member.id}`} key={member.id} state={ member } >
                        <button className="btn btn-light btn-display" type="button" data-toggle="modal" data-target="#exampleModal">
                            <div className="button-info">
                                <div className="button-info three">
                                    <span>{member.name}</span>
                                </div>
                                <div className="button-info four">
                                    <span>{member.email}</span>
                                </div>
                            </div>
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MemberDisplay;

