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
            <p className="title-transaction">Transactions</p>
            <div className="transaction">
                { transactionsGroup.sort((a, b) => b.id - a.id).map((transaction) => (
                    <Link to={`/groups/${ params.group_id }/transactions/${ transaction.id }`}
                        key={transaction.id} state={ transaction }>
                        <button className="btn btn-primary btn-lg btn-block btn-display">
                            <div className="transaction-info">
                                <div className="transaction-info one">
                                    <span className="kind">{(transaction.kind).charAt(0).toUpperCase() + (transaction.kind).slice(1)}</span>
                                    <span className="date">{new Date(transaction.date).toLocaleDateString('en-us', { day:"numeric", month:"short", year:"numeric" })}</span>
                                </div>

                                <div className="transaction-info two">
                                    <span>description: {transaction.description}</span>
                                    <span>$ {new Intl.NumberFormat().format(transaction.amount)}</span>
                                    <span>member: {transaction.member_id}</span>
                                </div>
                            </div>
                        </button>
                    </Link>
                ))}
            </div>

            <Link to={`/groups/${ params.group_id }/transactions/new`}>
                <button className="btn btn-primary btn-lg btn-block"
                    data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"
                >
                    + transaction
                </button>
            </Link>
        </div>
    );
};

export default TransactionDisplay;