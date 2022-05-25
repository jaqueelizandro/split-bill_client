import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const TransactionDisplay = (props) => {
    const [transactionsGroup, setTransactionsGroup] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3000/groups/${ id }/transactions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((transactions) => setTransactionsGroup(transactions))
    }, []);
    
    return(
        <div>
            {transactionsGroup.map((transaction) => (
                <div key={transaction.id}>
                    <p>kind: {transaction.kind}</p>
                    <p>description: {transaction.description}</p>
                    <p>amount: {transaction.amount}</p>
                    <p>date: {transaction.date}</p>
                    <p>member: {transaction.member_id}</p>
                    -----
                </div>
            ))}

            <Link to={`/groups/${ id }/transactions`}>
                <button className="btn btn-primary btn-lg btn-block">+ transaction</button>
            </Link>
        </div>
    );
};

export default TransactionDisplay;