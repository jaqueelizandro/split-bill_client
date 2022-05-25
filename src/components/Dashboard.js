import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Debts from "./Debts";
import TransactionDisplay from "./TransactionDisplay";
import MemberDisplay from "./MemberDisplay"

const Dashboard = (props) => {

    const { groups_id  } = useParams();
    
    return(
        <div>
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <Link to={`/groups/${ groups_id }`} className="nav-link active" aria-current="page">
                        Debts
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to={`/groups/${ groups_id }/transactions`} className="nav-link active" aria-current="page">
                        Transactions
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to={`/groups/${ groups_id }/members`} className="nav-link active" aria-current="page">
                        Members
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Dashboard;

