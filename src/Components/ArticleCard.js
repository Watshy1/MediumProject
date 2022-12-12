import { useNavigate } from 'react-router-dom';

export default function ArticleCard(props) {

    let navigate = useNavigate();

    return (
        <div className="rounded overflow-hidden shadow-lg bg-white mb-4 border-2 border-gray-200">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{ props.article.title }</div>
                <p className="text-gray-700 text-base">
                    { props.article.content }
                </p>
                <button onClick={() => {
                    navigate(`/articles/${props.article.id}`)
                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Voir l'article
                </button>
            </div>
        </div>
    )
}