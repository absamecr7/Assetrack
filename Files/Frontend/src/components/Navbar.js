import React from 'react';
import {Link} from 'react-router-dom';
import '../style.css';

class Navbar extends React.Component {
    
    render() {
        return (
            <div className="ui navbarComponent" >

                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

                    <Link to="/" className="navbar-brand">ExcerTracker</Link>
                    <div className="collpase navbar-collapse" >
                        <ul className="navbar-nav mr-auto">

                        <li className="navbar-item">
                        <Link to="/" className="nav-link" style={{color: "white"}}>Home</Link>
                        </li>

                        <li className="navbar-item">
                        <Link to="/dashboard" className="nav-link" style={{color: "white"}}>Dashboard</Link>
                        </li>

                        <li className="ui right">
                        <Link to="/certificate" className="nav-link" style={{color: "white"}}>Certificates</Link>
                        </li>
                        
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;