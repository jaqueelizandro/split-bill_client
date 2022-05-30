import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const TransactionCreate = (props) => {
    const [transaction, setTransaction] = useState({
        kind: 'expense',
        member_id: '',
        amount: '',
        description: '',
        date: (new Date().toISOString().split('T')[0]),
        image: ''
    });
    const [membersGroup, setMembersGroup] = useState([]);
    const navigate = useNavigate();

    const params = useParams();
    // console.log(params)

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
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        {/* <h5 class="modal-title" id="exampleModalLabel">New message</h5> */}
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={_handleSubmit}>
                            <select name="kind" value={transaction.kind} required
                                onChange={_handleChange}>
                                {/* <option value="">Choose type of transaction</option> */}
                                <option value="expense">Expense</option>
                                {/* <option value="transfer">Transfer</option>
                                <option value="income">Income</option> */}
                            </select>

                            <select name="member_id" value={transaction.member_id} required
                                onChange={_handleChange}>
                                <option value=''>Who paid</option>
                                {membersGroup.map((member) => (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                ))}
                            </select>

                            <input name="amount" value={transaction.amount} required
                                onChange={_handleChange} placeholder="$100.00" />
                            <input name="description" value={transaction.description} 
                                onChange={_handleChange} placeholder="Description" />
                            <input name="date" value={transaction.date} type="date" required
                                onChange={_handleChange} />
                            {/* <input name="image" value={transaction.image} placeholder="Image"
                                onChange={_handleChange} /> */}

                            <button className="btn btn-primary btn-lg btn-block">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionCreate;