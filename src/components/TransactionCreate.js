import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NumberFormat from 'react-number-format';

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
    }, []);

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
        .then((transaction) => navigate(-1))
    };

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

    const _handleChange = (event) => {
        setTransaction((prevTransaction) => ({
            ...prevTransaction, [event.target.name]: event.target.value
        })
    )};
    
    return(
        <div className="container">
            <p className="title-transaction">New expense</p>
            <div className="form-container">
                <form onSubmit={_handleSubmit}>
                    {/* <select name="kind" value={transaction.kind} required */}
                        {/* onChange={_handleChange}> */}
                        {/* <option value="">Choose type of transaction</option> */}
                        {/* <option value="expense">Expense</option> */}
                        {/* <option value="transfer">Transfer</option> */}
                        {/* <option value="income">Income</option> */}
                    {/* </select> */}

                    <select name="member_id" value={transaction.member_id} required className="form-select form-select-sm" 
                        onChange={_handleChange}>
                        <option value=''>Who paid</option>
                        {membersGroup.map((member) => (
                            <option key={member.id} value={member.id}>{member.name}</option>
                        ))}
                    </select>

                    <input name="description" value={transaction.description} className="form-control"
                        onChange={_handleChange} placeholder="Description" />
                                
                    <input name="amount" value={transaction.amount} required className="form-control"
                        onChange={_handleChange} placeholder="$100.00" />
                    
                    <input name="date" value={transaction.date} type="date" required className="form-control"
                        onChange={_handleChange} />
                    {/* <input name="image" value={transaction.image} placeholder="Image"
                        onChange={_handleChange} /> */}

                    <button className="btn btn-primary btn-lg btn-block">Save</button>
                </form>
            </div>
        </div>
    );
};

export default TransactionCreate;
