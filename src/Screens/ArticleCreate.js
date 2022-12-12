import { StoreContext } from '../Providers/Store';

import { useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export default function ArticleCreate() {

    const { token, categories } = useContext(StoreContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    useEffect(() => {

        if (!token) {
            navigate('/');
        }

    }, [token]);

    const onSubmit = (data) => {
        fetch('http://edu.project.etherial.fr/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                title: data.title,
                content: data.content,
                article_category_id: data.category
            })
        }).then((res) => {
            res.json().then((json) => {
                if (json.data) {
                    navigate('/articles/' + json.data.id);
                }
            });
        });
    };

    return (
        <form className="flex flex-col items-start pt-20" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Titre
                </label>
                <input
                    className="w-96 border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Entrez le titre de l'article"
                    {...register("title", { required: true })}
                />
                <br />
                {errors.title && <span>Ce champ est obligatoire</span>}
            </div>
            <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                    Contenu
                </label>
                <textarea
                    className="w-1/2 border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                    id="content"
                    type="text"
                    placeholder="Entrez le contenu de l'article"
                    {...register("content", { required: true })}
                />
                <br />
                {errors.content && <span>Ce champ est obligatoire</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                    Contenu
                </label>
                <select
                    className="w-96 border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                    id="category"
                    {...register("category", { required: true })}
                >
                    {
                        categories.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            );
                        })
                    }
                </select>
                <br />
                {errors.category && <span>Ce champ est obligatoire</span>}
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
    )

}