import React from "react";
import { Link, useParams } from "react-router-dom";

const Navigation = (props) => {
    const params = useParams();

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to={`/groups/${ params.group_id }`} className="navbar-brand mb-0 h1 title3">
                    Sp/it
                </Link>
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
    )
};

export default Navigation;

