import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";

const Debts = (props) => {
    const params = useParams();

    const [debts, setDebts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/groups/${ params.group_id }/debts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((debts) => setDebts(debts))
    }, [params.group_id ]);
    
    return(
        <div>
            {debts.map((debt) => (
                <p key={`${debt.settle.id}-${debt.income.id}`}>
                    {debt.settle.name} owes {debt.income.name} $ {debt.amount}
                    <Link to={`/groups/${ params.group_id }/settle/new`}
                        state={ debt }
                    >
                        <button>Settle</button>
                    </Link>
                </p>
            ))}
        </div>
    );
};

export default Debts;