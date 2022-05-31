import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import NumberFormat from 'react-number-format';

const Settle = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    
    const debt = location.state;
    const [settle, setSettle] = useState({
        kind: 'settle',
        who_paid: debt.settle.id,
        description: 'Settle up with',
        paid_for: debt.income.id,
        amount: debt.amount,
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
        .then((settle) => navigate(-1))
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
        <div className="container">
            <p className="title-transaction">Settle Up</p>
            <div className="form-container">
                <form onSubmit={_handleSubmit}>
                    {/* <select name="kind" value={settle.kind} required onChange={_handleChange}> */}
                        {/* <option value="">Choose type of transaction</option> */}
                        {/* <option value="expense">Expense</option> */}
                        {/* <option value="transfer">Transfer</option> */}
                        {/* <option value="settle">Income</option> */}
                    {/* </select> */}

                    <select name="who_paid" value={settle.who_paid} required className="form-select form-select-sm"
                        onChange={_handleChange}>
                        <option value=''>Who paid</option>
                        {membersGroup.map((member) => (
                            <option key={member.id} value={member.id}>{member.name}</option>
                        ))}
                    </select>

                    <input name="description" value={settle.description} placeholder="Description"
                        onChange={_handleChange} className="form-control" />

                    <select name="paid_for" value={settle.paid_for} required className="form-select form-select-sm"
                        onChange={_handleChange}>
                        <option value=''>Who paid</option>
                        {membersGroup.map((member) => (
                            <option key={member.id} value={member.id}>{member.name}</option>
                        ))}
                    </select>    

                    <NumberFormat name="amount" value={settle.amount} required className="form-control" 
                        onChange={_handleChange} thousandSeparator={true} prefix={'$'} />

                    <input name="date" value={settle.date} type="date" required 
                        onChange={_handleChange} className="form-control" />
                    {/* <input name="image" value={transaction.image} placeholder="Image"
                        onChange={_handleChange} /> */}

                    <button className="btn btn-primary btn-lg btn-block">Save</button>
                </form>
                <button className="btn btn-primary btn-lg btn-block"
                    onClick={_handleClick}>Cancel</button>
            </div>
        </div>
    );
};

export default Settle;