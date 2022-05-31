import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TransactionDisplay = (props) => {
    const params = useParams();

    const [transactionsGroup, setTransactionsGroup] = useState([]);
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

    useEffect(() => {
        fetch(`http://localhost:3000/groups/${ params.group_id }/transactions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((transactions) => setTransactionsGroup(transactions))
    }, []);
    
    return(
        <div className="container">
            <div className="header">
                <p className="title3">Transactions</p>
                <Link to={`/groups/${ params.group_id }/transactions/new`}>
                    <button className="btn btn-light" type="button" data-toggle="modal" data-target="#exampleModal">
                        + transaction
                    </button>
                </Link>
            </div>

            <div className="list">
                { transactionsGroup.sort((a, b) => b.id - a.id).map((transaction) => (
                    <Link to={`/groups/${ params.group_id }/transactions/${ transaction.id }`}
                        key={transaction.id} state={ transaction }>
                        <button className="btn btn-primary btn-lg btn-block btn-display">
                            <div className="transaction-info">
                                <div className="transaction-info one">
                                    <span className="kind">{(transaction.kind).charAt(0).toUpperCase() + (transaction.kind).slice(1)}: {transaction.description}</span>
                                    <span className="date">{new Date(transaction.date).toLocaleDateString('en-us', { day:"numeric", month:"short", year:"numeric" })}</span>
                                </div>

                                <div className="transaction-info two">
                                    <span>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(transaction.amount)}</span>
                                    {membersGroup.map((member) => {
                                        if (transaction.member_id === member.id) {
                                            return <span key={transaction.id}>{member.name}</span>
                                        }
                                    })}
                                </div>
                            </div>
                        </button>
                    </Link>
                ))}
            </div>


        </div>
    );
};

export default TransactionDisplay;