import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import NumberFormat from 'react-number-format';
import $ from 'jquery';

const TransactionEdit = (props) => {
    const navigate = useNavigate();
    const params = useParams();
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

    useEffect(() => {
        fetch(`${ process.env.REACT_APP_BACKEND_HOST }/groups/${ params.group_id }/members`, {
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
        fetch(`${ process.env.REACT_APP_BACKEND_HOST }/groups/${ params.group_id }/transactions/${ params.id }`, {
            method: 'PATCH',
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

    const _handleDelete = (event) => {
        event.preventDefault();
        fetch(`${ process.env.BACKEND_HOST}/groups/${ params.group_id }/transactions/${ params.id }`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction),
        })
        .then((resp) => {
            if (resp.status === 204) {
                $('.modal-backdrop').remove();
                navigate(`/groups/${ params.group_id }/transactions`)
            }
        })
    }

    const _handleClick = () => {
        navigate(`/groups/${ params.group_id }/transactions`);
    }
    
    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{ (transaction.kind).charAt(0).toUpperCase() + (transaction.kind).slice(1) }</h5>
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
                                        
                            <NumberFormat name="amount" value={new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(transaction.amount)} required className="form-control" 
                                onChange={_handleChange} thousandSeparator={true} placeholder="$100.00" />
                            
                            <input name="date" value={transaction.date} type="date" required className="form-control"
                                onChange={_handleChange} />

                            <button className="btn btn-light btn-lg btn-block">Save</button>
                        </form>
                        <button className="btn btn-light btn-lg btn-block"
                            onClick={_handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionEdit;
