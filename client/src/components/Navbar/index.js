import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './css/style.css';
import { Button } from '../Button';
import Auth from '../../utils/auth';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const logout = event => {
        event.preventDefault();
        Auth.logout();
      };

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className = "navbar">
                <div className = "navbar-container">
                    <Link to ='/' className = "navbar-logo" onClick = {closeMobileMenu}>
                        Wish-List &nbsp;
                        <i class="fas fa-gift"/>
                    </Link>
                    <div className = "menu-icon" onClick = {handleClick}>
                        <i className = {click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>

                    {Auth.loggedIn() ? (
                        <>
                        <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
                        <Link to="/dashboard" className = 'nav-links' onClick = {closeMobileMenu}> 
                            DashBoard
                        </Link>
                        <Link to="/shoppinglist" className = 'nav-links' onClick = {closeMobileMenu}> 
                            Shopping
                        </Link>
                        <Link to="/friendslist" className = 'nav-links' onClick = {closeMobileMenu}> 
                            Friends
                        </Link>
                        <Link to="/Home" className = 'nav-links' onClick = {closeMobileMenu}> 
                        <a onClick={logout}>
                            Logout
                        </a>
                        </Link>
                        </ul>
                        </>
                    ) : (
                        <>
                    <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
                        <li className = 'nav-item'>
                            <Link to ='../Login' className = 'nav-links' onClick = {closeMobileMenu}>
                                Login
                            </Link>
                            <Link to ='../Signup' className = 'nav-links-mobile' onClick = {closeMobileMenu}>
                                SignUp
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle = 'btn--outline'> SIGNUP </Button>}
                        </>
                    )}
                    
                </div>

            </nav>
        </>
    );
}

export default Navbar;
