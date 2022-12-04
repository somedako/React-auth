import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../../axios';

const Popup = ({ popup, setPopup, user, setUser }) => {
    const [status, setStatus] = useState('signIn');
    const { register, handleSubmit, reset } = useForm();

    const popupClose = (e) => {
        if (e.target.classList.contains('overlay')) {
            setPopup(false);
        }
    };

    const signInHandler = (data) => {
        axios.post('/login', data).then((res) => {
            setUser(res.data.user);
            setPopup(false);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            reset();
        });
    };

    const signUpHandler = (data) => {
        axios
            .post('/users', {
                ...data,
                date: new Date(),
                comments: '',
                active: true,
            })
            .then((res) => {
                setUser(res.data.user);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setPopup(false);
                reset();
            })
            .catch((err) => alert(err));
    };
    return (
        <div
            onClick={(e) => popupClose(e)}
            className={`overlay ${popup && 'overlay__active'}`}
        >
            <div className="popup">
                <form
                    onSubmit={
                        status === 'signIn'
                            ? handleSubmit(signInHandler)
                            : handleSubmit(signUpHandler)
                    }
                >
                    <div className="form-group">
                        <div className="popup__top">
                            <h2
                                onClick={() => setStatus('signIn')}
                                className={`popup__title ${
                                    status === 'signIn' && 'popup__title_active'
                                }`}
                            >
                                Войти
                            </h2>
                            <h2
                                onClick={() => setStatus('signUp')}
                                className={`popup__title ${
                                    status === 'signUp' && 'popup__title_active'
                                }`}
                            >
                                Регистрация
                            </h2>
                        </div>

                        <input
                            {...register('email')}
                            type="email"
                            className="form-control"
                            placeholder="Введите email"
                        />
                        {status === 'signUp' && (
                            <input
                                {...register('name')}
                                type="text"
                                className="form-control"
                                placeholder="Введите имя"
                            />
                        )}

                        <input
                            {...register('password')}
                            type="password"
                            className="form-control"
                            placeholder="Введите пароль"
                        />

                        <button type="submit" className="btn btn-primary">
                            {status === 'signIn' ? 'Войти' : 'Регистрация'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Popup;
