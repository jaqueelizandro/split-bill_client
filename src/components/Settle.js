import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import NumberFormat from 'react-number-format';

const Settle = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    
    const [settle, setSettle] = useState({
        kind: 'settle',
        who_paid: location.state.settle.id,
        description: 'Settle up',
        paid_for: location.state.income.id,
        amount: location.state.amount,
        date: (new Date().toISOString().split('T')[0])
    })
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
    
    const _handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/groups/${ params.group_id }/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settle),
        })
        // .then((resp) => resp.json())
        .then((settle) => navigate(`/groups/${ params.group_id }`))
    };

    const _handleChange = (event) => {
        setSettle((prevSettle) => ({
            ...prevSettle, [event.target.name]: event.target.value
        })
    )};

    const _handleClick = () => {
        navigate(`/groups/${ params.group_id }`);
    }
    
    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Settle Up</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={_handleClick}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={_handleSubmit}>
                            <select name="who_paid" value={settle.who_paid} required className="form-control"
                                onChange={_handleChange}>
                                <option value=''>Who paid</option>
                                {membersGroup.map((member) => (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                ))}
                            </select>

                            <input name="description" value={settle.description} className="form-control"
                                onChange={_handleChange} placeholder="Description" />

                            <select name="paid_for" value={settle.paid_for} required className="form-control"
                                onChange={_handleChange}>
                                <option value=''>Who paid</option>
                                {membersGroup.map((member) => (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                ))}
                            </select>    

                            <NumberFormat name="amount" value={settle.amount} required className="form-control" 
                                onChange={_handleChange} thousandSeparator={true} />

                            <input name="date" value={settle.date} type="date" required className="form-control"
                                onChange={_handleChange} />

                            <button className="btn btn-light btn-lg btn-block">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settle;