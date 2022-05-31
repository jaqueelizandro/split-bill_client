import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Arrow from "../arrow.svg"

const Dashboard = (props) => {
    const params = useParams();

    const [debts, setDebts] = useState([]);

    useEffect(() => {
        fetch(`${ process.env.REACT_APP_BACKEND_HOST }/groups/${ params.group_id }/debts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((debts) => setDebts(debts))
    }, [params.group_id]);
    
    if (debts.length === 0) {
        return(
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1 title3">Sp/it</span>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={`/groups/${ params.group_id }/transactions`} className="nav-link">
                                    Transactions <span className="sr-only">(current)</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={`/groups/${ params.group_id }/members`} className="nav-link">
                                    Members<span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="no-debts">
                    <p>No debts to settle up.</p>
                    <p>Add expenses in Transactions.</p>
                </div>
                
            </div>
        )
    } else {
        return(
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1 title3">Sp/it</span>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={`/groups/${ params.group_id }/transactions`} className="nav-link">
                                    Transactions <span className="sr-only">(current)</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={`/groups/${ params.group_id }/members`} className="nav-link">
                                    Members<span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div>
                    {debts.sort((a, b) => b.settle.id - a.settle.id).map((debt) => (
                        <div key={`${debt.settle.id}-${debt.income.id}`} className="settle">
                            <p className="name1">{debt.settle.name}</p>
                            <img src={Arrow} alt="arrow" className="arrow" />
                            {/* <p className="owes">owes</p> */}
                            <p className="name2">{debt.income.name}</p>
                            <p className="amount">{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(debt.amount)}</p>
                            <Link to={`/groups/${ params.group_id }/settle/new`} state={ debt } className="link">
                                <button className="btn btn-light" type="button" data-toggle="modal" data-target="#exampleModal">Settle</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
};

export default Dashboard;
