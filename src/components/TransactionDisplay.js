import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "./Navigation";

const TransactionDisplay = (props) => {
    const params = useParams();

    const [transactionsGroup, setTransactionsGroup] = useState([]);
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

        fetch(`${ process.env.REACT_APP_BACKEND_HOST }/groups/${ params.group_id }/transactions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((transactions) => setTransactionsGroup(transactions))
    }, [params.group_id]);
    
    return(
        <div className="container">
            <Navigation />
            <div>
                <p className="title3">Transactions</p>
                <Link to={`/groups/${ params.group_id }/transactions/new`} className="link">
                    <button className="btn btn-light" type="button" data-toggle="modal" data-target="#exampleModal">
                        + expense
                    </button>
                </Link>
            </div>

            <div className="header">
                <span></span>
                <span></span>
            </div>

            <div className="list">
                { transactionsGroup.sort((a, b) => b.id - a.id).map((transaction) => {
                    let member = membersGroup.find((member) => {
                        if (transaction.member_id === member.id) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    return  <Link to={`/groups/${ params.group_id }/transactions/${ transaction.id }`}
                                key={transaction.id} state={ transaction }>
                                <button className="btn btn-light btn-display" type="button" data-toggle="modal" data-target="#exampleModal">
                                    <div className="button-info">
                                        <div className="button-info one">
                                            <span className="kind">{(transaction.kind).charAt(0).toUpperCase() + (transaction.kind).slice(1)}: {transaction.description}</span>
                                            <span className="date">{new Date(transaction.date).toLocaleDateString('en-us', { day:"numeric", month:"short", year:"numeric" })}</span>
                                        </div>

                                        <div className="button-info two">
                                            <span>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(transaction.amount)}</span>
                                            <span key={transaction.id}>{member.name}</span>
                                        </div>
                                    </div>
                                </button>
                            </Link>
                })}
            </div>


        </div>
    );
};

export default TransactionDisplay;