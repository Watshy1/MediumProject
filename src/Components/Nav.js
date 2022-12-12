import { Link } from 'react-router-dom'

import { StoreContext } from '../Providers/Store';

import { useContext } from 'react';

export default function Nav() {

    const { token, setToken } = useContext(StoreContext)

    return (
        <div>
            <ul className="flex justify-between border-b">
                <div className='flex'>
                    <li className="mb-px mr-1">
                        <Link to="/" className='bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'>
                            Home
                        </Link>
                    </li>
                    {token ? (
                        <li className="mb-px mr-1">
                            <Link to="/articles/create" className='bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'>
                                Créer un article
                            </Link>
                        </li>
                    ) : null}
                </div>
                <div className='flex'>
                    <li className='mb-px mr-1'>
                        <Link to="/register" className='bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'>
                            Register
                        </Link>
                    </li>
                    <li className="mb-px mr-1">
                        {token ? (
                            <button onClick={() => {
                                localStorage.removeItem('token')
                                setToken(null)
                            }} className='bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'>
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className='bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'>
                                Login
                            </Link>
                        )}
                    </li>
                </div>
            </ul>
        </div>
    )

}