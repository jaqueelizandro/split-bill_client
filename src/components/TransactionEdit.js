import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/style.css"

const TransactionEdit = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [transaction, setTransaction] = useState({
        kind: location.state.kind,
        member_id: location.state.member_id,
        amount: location.state.amount,
        description: location.state.description,
        date: (new Date(location.state.date).toISOString().split('T')[0]),
        image: ''
    });
    const [membersGroup, setMembersGroup] = useState([]);

    const params = useParams();
    // console.log(params)

    const _handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/groups/${ params.group_id }/transactions/${ params.id }`, {
            method: 'PATCH',
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

    const _handleDelete = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/groups/${ params.group_id }/transactions/${ params.id }`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction),
        })
        .then((resp) => {
            if (resp.status === 204) {
                navigate(`/groups/${ params.group_id }/transactions`)
            }
        })
    }

    const _handleClick = () => {
        navigate(`/groups/${ params.group_id }/transactions`);
    }
    
    return(
        <div className="container">
            <p className="title-transaction">{ (transaction.kind).charAt(0).toUpperCase() + (transaction.kind).slice(1) }</p>
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

                    <button className="btn btn-primary btn-lg btn-block">Edit</button>
                </form>
                    <button className="btn btn-primary btn-lg btn-block"
                        onClick={_handleDelete}>Delete</button>
                    <button className="btn btn-primary btn-lg btn-block"
                        onClick={_handleClick}>Cancel</button>
            </div>
        </div>
    );
};

export default TransactionEdit;
