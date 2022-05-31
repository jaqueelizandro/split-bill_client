import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "./Navigation";
import Arrow from "../arrow.svg"

const Dashboard = (props) => {
    const params = useParams();

    const [debts, setDebts] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetch(`${ process.env.REACT_APP_BACKEND_HOST }/groups/${ params.group_id }/debts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((debts) => {
            setDebts(debts)
            setLoad(true)
        }
    )}, [params.group_id]);
    
    if (load && debts.length === 0) {
        return(
            <div className="container">
                <Navigation />
                <div className="no-debts">
                    <p>No debts to settle up.</p>
                    <p>Add expenses in Transactions.</p>
                </div>
                
            </div>
        )
    } else {
        return(
            <div className="container">
                <Navigation />
                {debts.sort((a, b) => b.settle.id - a.settle.id).map((debt) => (
                    <div key={`${debt.settle.id}-${debt.income.id}`} className="settle">
                        <p className="name1">{debt.settle.name}</p>
                        <img src={Arrow} alt="arrow" className="arrow" />
                        <p className="name2">{debt.income.name}</p>
                        <p className="amount">{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(debt.amount)}</p>
                        <Link to={`/groups/${ params.group_id }/settle/new`} state={ debt } className="link">
                            <button className="btn btn-light" type="button" data-toggle="modal" data-target="#exampleModal">Settle</button>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
};

export default Dashboard;
