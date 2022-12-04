import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Popup from '../../components/Popup/Popup';

const Header = ({ user, setUser }) => {
    const [popup, setPopup] = useState(false);
    const logOutUser = () => {
        localStorage.removeItem('user');
        setUser({});
    };
    return (
        <header className="header">
            <Container>
                <Row className=" mt-4 d-flex justify-content-between align-items-center">
                    <Col md="6">
                        <Link className="header__link" to={'/'}>
                            <h1 className="header__logo">MyProject</h1>
                        </Link>
                    </Col>
                    <Col md="6">
                        <Link className="header__link" to={'/'}>
                            {user.email ? (
                                <div className="header__auth">
                                    <p className="header__name">{user.name}</p>
                                    <button
                                        onClick={() => logOutUser()}
                                        className="btn btn-danger"
                                        type="button"
                                    >
                                        Выйти
                                    </button>
                                </div>
                            ) : (
                                <p
                                    onClick={() => setPopup(true)}
                                    className="header__login"
                                >
                                    Войти - регистрация
                                </p>
                            )}
                        </Link>
                    </Col>
                </Row>
            </Container>
            {popup && (
                <Popup
                    user={user}
                    setUser={setUser}
                    popup={popup}
                    setPopup={setPopup}
                />
            )}
        </header>
    );
};

export default Header;
