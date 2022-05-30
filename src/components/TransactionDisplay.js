import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/style.css"

const TransactionDisplay = (props) => {
    const [transactionsGroup, setTransactionsGroup] = useState([]);

    const params = useParams();
    // console.log(params)

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