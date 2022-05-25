import React, {useState, useEffect} from "react";
import { useParams } from "react-router";

const Debts = (props) => {
    const [debts, setDebts] = useState([]);


    const params = useParams();
    useEffect(() => {
        const fetchDebts = () => {
            fetch(`http://localhost:3000/groups/${ params.id }/debts`, {
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