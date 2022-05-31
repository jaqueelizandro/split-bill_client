import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Dashboard = (props) => {
    const params = useParams();

    const [debts, setDebts] = useState([]);

    useEffect(() => {
        const fetchDebts = () => {
            fetch(`http://localhost:3000/groups/${ params.group_id }/debts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((resp) => resp.json())
            .then((debts) => setDebts(debts))
        }

        fetchDebts();
    }, []);
    
    if (debts.length === 0) {
        return(
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1 title3">Sp/it</span>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
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
                </nav>
                <p className="no-debts">No debts to settle up</p>
            </div>
        )
    } else {
        return(
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1 title3">Sp/it</span>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
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
                </nav>
                <div>
                    {debts.map((debt) => (
                        <div key={`${debt.settle.id}-${debt.income.id}`} className="settle">
                            <p className="settle name1">{debt.settle.name}</p>
                            <p className="settle owes">owes</p>
                            <p className="settle name2">{debt.income.name}</p>
                            <p className="settle amount">$ {debt.amount}</p>
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
