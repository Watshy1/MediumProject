import { StoreContext } from '../Providers/Store';

import { useContext } from 'react';

import ArticleCard from '../Components/ArticleCard';

export default function Home() {

    const {
        articles,
        pageArray,
        maxArticles,
        offset, setOffset,
        categories,
        currentCategory, setCurrentCategory
    } = useContext(StoreContext);

    return (
        <div className='pt-10'>
            <h1 className="pb-5 text-2xl font-bold text-gray-900">Liste des Articles</h1>
            <select
                className='mb-5 p-2 rounded border border-gray-300'
                onChange={(e) => {
                    setCurrentCategory(e.target.value);
                }}>
                <option value="0">All</option>
                {
                    categories.map((category) => {
                        return (
                            <option value={category.id}>{category.name}</option>
                        )
                    })
                }
            </select>
            <div>
                {
                    articles.filter((article) => {
                        if (article.article_category_id == currentCategory || currentCategory == 0) {
                            return true;
                        }
                    }).map((article) => {
                        return (
                            <ArticleCard article={article} />
                        )
                    })
                }
            </div>

            <div className="flex justify-center">
                <button className="block cursor-pointer px-3 py-2 ml-0 text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => {
                    if (offset > 0) {
                        setOffset(offset - 10);
                    }
                }}>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </button>
                {
                    pageArray.map((page) => {
                        return (
                            <button className="block px-3 py-2 leading-tight text-blue-500 bg-white border-t border-b border-gray-300 hover:bg-gray-100" onClick={() => {
                                setOffset(page * 10 - 10);
                            }}>
                                {page}
                            </button>
                        )
                    })
                }
                <button className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => {
                    if (offset >= 0 && offset <= maxArticles - 10) {
                        setOffset(offset + 10);
                    }
                }}>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </button>
            </div>

        </div>
    )

}