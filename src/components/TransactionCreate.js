import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NumberFormat from 'react-number-format';
import $ from 'jquery';

const TransactionCreate = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    const [transaction, setTransaction] = useState({
        kind: 'expense',
        member_id: '',
        amount: '',
        description: '',
        date: (new Date().toISOString().split('T')[0]),
        image: ''
    });
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
    }, [params.group_id]);

    const _handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/groups/${ params.group_id }/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction),
        })
        .then((resp) => resp.json())
        .then((transaction) => {
            $('.modal-backdrop').remove();
            navigate(`/groups/${ params.group_id }/transactions`)
        })
    };

    const _handleChange = (event) => {
        setTransaction((prevTransaction) => ({
            ...prevTransaction, [event.target.name]: event.target.value
        })
    )};

    const _handleClick = () => {
        navigate(`/groups/${ params.group_id }/transactions`);
    }
    
    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New expense</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={_handleClick}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={_handleSubmit}>
                            <select name="member_id" value={transaction.member_id} required className="form-control" 
                                onChange={_handleChange}>
                                    <option value=''>Who paid</option>
                                    {membersGroup.map((member) => (
                                        <option key={member.id} value={member.id}>{member.name}</option>
                                    ))}
                            </select>

                            <input name="description" value={transaction.description} className="form-control"
                                onChange={_handleChange} placeholder="Description" />
                                        
                            <NumberFormat name="amount" value={transaction.amount} required className="form-control" 
                                onChange={_handleChange} thousandSeparator={true} placeholder="$100.00" />
                            
                            <input name="date" value={transaction.date} type="date" required className="form-control"
                                onChange={_handleChange} />

                            <button className="btn btn-light btn-lg btn-block">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionCreate;
