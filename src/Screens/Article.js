import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Article() {

    const { id } = useParams();

    const [article, setArticle] = useState([]);

    function getOneArticle() {
        fetch('http://edu.project.etherial.fr/articles/' + id).then((res) => {
            res.json().then((json) => {
                setArticle(json.data);
            });
        });
    }

    useEffect(() => {

        getOneArticle();

    }, []);

    return (
        <div className="mt-14 rounded overflow-hidden shadow-lg bg-white mb-4 border-2 border-gray-200">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{article.title}</div>
                <p className="text-gray-700 text-base">
                    {article.content}
                </p>
            </div>
        </div>
    )

}