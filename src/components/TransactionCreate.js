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
        .then((transaction) => navigate(`/groups/${ params.group_id }/transactions`))
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
                        {/* <select name="kind" value={transaction.kind} required onChange={_handleChange}> */}
                            {/* <option value="">Choose type of transaction</option> */}
                            {/* <option value="expense">Expense</option> */}
                            {/* <option value="transfer">Transfer</option> */}
                            {/* <option value="income">Income</option> */}
                        {/* </select> */}

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

                        {/* <input name="image" value={transaction.image} placeholder="Image"
                            onChange={_handleChange} /> */}

                        <button className="btn btn-primary btn-lg btn-block">Save</button>
                    </form>
                </div>
                {/* <div className="modal-footer"> */}
                    {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                    {/* <button className="btn btn-primary btn-lg btn-block">Save</button> */}
                {/* </div> */}
                </div>
            </div>
        </div>
        // <div className="container">
        //     <p className="title-transaction">New expense</p>
        //     <div className="form-container">
        //         <form onSubmit={_handleSubmit}>
        //             {/* <select name="kind" value={transaction.kind} required */}
        //                 {/* onChange={_handleChange}> */}
        //                 {/* <option value="">Choose type of transaction</option> */}
        //                 {/* <option value="expense">Expense</option> */}
        //                 {/* <option value="transfer">Transfer</option> */}
        //                 {/* <option value="income">Income</option> */}
        //             {/* </select> */}

        //             <select name="member_id" value={transaction.member_id} required className="form-select form-select-sm" 
        //                 onChange={_handleChange}>
        //                 <option value=''>Who paid</option>
        //                 {membersGroup.map((member) => (
        //                     <option key={member.id} value={member.id}>{member.name}</option>
        //                 ))}
        //             </select>

        //             <input name="description" value={transaction.description} className="form-control"
        //                 onChange={_handleChange} placeholder="Description" />
                                
        //             <NumberFormat name="amount" value={transaction.amount} required className="form-control" 
        //              onChange={_handleChange} thousandSeparator={true} prefix={'$'} placeholder="$100.00" />
                    
        //             <input name="date" value={transaction.date} type="date" required className="form-control"
        //                 onChange={_handleChange} />

        //             {/* <input name="image" value={transaction.image} placeholder="Image"
        //                 onChange={_handleChange} /> */}

        //             <button className="btn btn-primary btn-lg btn-block">Save</button>
        //         </form>
        //         <button className="btn btn-primary btn-lg btn-block"
        //                 onClick={_handleClick}>Cancel</button>
        //     </div>
        // </div>
    );
};

export default TransactionCreate;
