import { StoreContext } from '../Providers/Store';

import { useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const { token, setToken } = useContext(StoreContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    useEffect(() => {

        if (token) {
            navigate('/');
        }

    }, [token]);

    const onSubmit = (data) => {
        fetch('http://edu.project.etherial.fr/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).then((res) => {
            res.json().then((json) => {
                if (json.data.token) {
                    localStorage.setItem('token', json.data.token);
                    setToken(json.data.token);
                    alert('Vous êtes connecté');
                } else {
                    alert('Vos identifiants sont incorrects');
                }
            });
        });
    };

    return (

        <form className="flex flex-col items-start pt-20" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="w-96 border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Entrez votre email"
                    {...register("email", { required: true })}
                />
                <br />
                {errors.email && <span>Ce champ est obligatoire</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Mot de passe
                </label>
                <input
                    className="w-96 border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    {...register("password", { required: true })}
                />
                <br />
                {errors.password && <span>Ce champ est obligatoire</span>}
            </div>
            <div className="mb-6 text-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Soumettre
                </button>
            </div>
        </form>
    );

}
