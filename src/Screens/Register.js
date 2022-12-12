import { useForm } from "react-hook-form";

export default function Login(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        fetch('http://edu.project.etherial.fr/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
                password_verif: data.password_verif
            })
        }).then((res) => {
            res.json().then((json) => {
                if (json.data) {
                    alert('Votre compte a bien été créé');
                } else {
                    alert('Erreur lors de la création de votre compte');
                }
            });
        });
    };

    return (

        <form className="flex flex-col items-start pt-20" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                    Prénom
                </label>
                <input
                    className="w-96 border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                    id="firstname"
                    type="text"
                    placeholder="Entrez votre prénom"
                    {...register("firstname", { required: true })}
                />
                <br />
                {errors.firstname && <span>Ce champ est obligatoire</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                    Nom
                </label>
                <input
                    className="w-96 border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    placeholder="Entrez votre nom"
                    {...register("lastname", { required: true })}
                />
                <br />
                {errors.lastname && <span>Ce champ est obligatoire</span>}
            </div>
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
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Mot de passe (vérification)
                </label>
                <input
                    className="w-96 border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                    id="password_verif"
                    type="password"
                    placeholder="Entrez à nouveau votre mot de passe"
                    {...register("password_verif", { required: true })}
                />
                <br />
                {errors.password_verif && <span>Ce champ est obligatoire</span>}
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
