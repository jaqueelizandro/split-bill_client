import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/style.css"

const Debts = (props) => {
    const [debts, setDebts] = useState([]);

    // console.log(debts)

    const params = useParams();
    console.log(params)

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
    
    return(
        <div>
            debts
        </div>
    );
};

export default Debts;