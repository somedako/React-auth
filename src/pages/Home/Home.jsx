import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import axios from '../../axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TbLock } from 'react-icons/tb';
import { CgUnblock } from 'react-icons/cg';
import { MdDeleteOutline } from 'react-icons/md';

const Home = () => {
    const [person, setPerson] = useState([]);
    const [comment, setComment] = useState();
    useEffect(() => {
        axios.get('/users').then(({ data }) => {
            setPerson(data);
        });
    }, []);

    useEffect(() => {}, []);

    const checkBoxChecked = (e) => {
        let checkboxes = document.getElementsByName('foo');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = e.target.checked;
        }
    };

    const addComment = () => {
        axios
            .patch('/users', {
                comments: [
                    ...users.comments,
                    {
                        id: uuidv4(),
                        text: comment,
                    },
                ],
            })
            .then(() => {
                setComment('');
            });
    };

    return (
        <div style={{ marginTop: '120px' }}>
            <Container>
                <Row>
                    <Col md="12">
                        {localStorage.length > 0 ? (
                            <>
                                <div
                                    style={{ paddingLeft: '32px' }}
                                    className="input-group-text"
                                >
                                    <input
                                        onClick={(e) => checkBoxChecked(e)}
                                        className="form-check-input mt-0"
                                        type="checkbox"
                                    />
                                    <div className="panel">
                                        <button
                                            style={{
                                                color: '#806a00',
                                                fontSize: '20px',
                                            }}
                                            className="btn "
                                            type="button"
                                        >
                                            <TbLock />
                                        </button>
                                        <button
                                            style={{
                                                color: 'green',
                                                fontSize: '20px',
                                            }}
                                            className="btn"
                                            type="button"
                                        >
                                            <CgUnblock />
                                        </button>
                                        <button
                                            style={{
                                                color: 'red',
                                                fontSize: '20px',
                                            }}
                                            className="btn"
                                            type="button"
                                        >
                                            <MdDeleteOutline />
                                        </button>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr style={{ color: 'white' }}>
                                            <th scope="col"></th>
                                            <th scope="col">#</th>
                                            <th scope="col">Имя</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">
                                                Дата регистрации
                                            </th>
                                            <th scope="col">Статус</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {person.map((item) => (
                                            <tr
                                                key={item.id}
                                                style={{ color: 'white' }}
                                            >
                                                <th scope="row">
                                                    <input
                                                        className="form-check-input mt-0"
                                                        type="checkbox"
                                                        name="foo"
                                                    />
                                                </th>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.date}</td>
                                                <td>
                                                    {item.active
                                                        ? 'Активный'
                                                        : 'Неактивный'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            ''
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <div
                            style={{
                                width: '700px',
                                margin: '0 auto',
                            }}
                            className="form-group"
                        >
                            <label for="exampleFormControlTextarea1">
                                Оставить комментарий
                            </label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                            ></textarea>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
