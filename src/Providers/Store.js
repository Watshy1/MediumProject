import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext()

export function StoreProvider(props) {

    const [token, setToken] = useState(
        localStorage.getItem('token') ? localStorage.getItem('token') : null
    )

    const [pageArray, setPageArray] = useState([])
    const [offset, setOffset] = useState(0)


    const [articles, setArticles] = useState([])
    const [maxArticles, setMaxArticles] = useState(0);
    const [pageNumbers, setPageNumbers] = useState(0)

    function getAllArticles() {
        fetch('http://edu.project.etherial.fr/articles?offset=' + offset).then((res) => {
            res.json().then((json) => {
                if (json.data) {
                    setArticles(json.data);
                    setMaxArticles(json.count);
                    setPageNumbers(Math.ceil(json.count / 10));
                }
            });
        });
    }

    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState(0)

    function getAllCategories() {
        fetch('http://edu.project.etherial.fr/articles/categories').then((res) => {
            res.json().then((json) => {
                if (json.data) {
                    setCategories(json.data);
                }
            });
        });
    }

    useEffect(() => {

        getAllArticles();
        getAllCategories();

    }, [])

    useEffect(() => {

        getAllArticles();

    }, [offset])

    useEffect(() => {

        const pageArrayTmp = [];

        for (let i = 1; i <= pageNumbers; i++) {
            pageArrayTmp.push(i);
        }

        setPageArray(pageArrayTmp);

    }, [pageNumbers])

    useEffect(() => {

        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }

    }, [token])

    return (
        <StoreContext.Provider value={{
            articles: articles, setArticles: setArticles,
            pageArray: pageArray, setPageArray: setPageArray,
            maxArticles: maxArticles, setMaxArticles: setMaxArticles,
            offset: offset, setOffset: setOffset,
            token: token, setToken: setToken,
            categories: categories, setCategories: setCategories,
            currentCategory: currentCategory, setCurrentCategory: setCurrentCategory
        }}>
            {props.children}
        </StoreContext.Provider>
    )

}