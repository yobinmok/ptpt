import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';


function Navbar() {

    const { isLogin, logout } = useContext(LoginContext);

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <a href="/" className="text-lg font-bold">MyApp</a>
                </div>
                <div>
                    {isLogin ? (
                        <>
                            <Link to="/">마이페이지</Link>
                            {' | '}
                            <button onClick={logout}>로그아웃</button>
                        </>
                    ) : (
                        <>
                            <Link to="/">홈</Link>
                            {' | '}
                            <Link to="/signup">Signup</Link>
                            {' | '}
                            <Link to="/login">Login</Link>
                        </>
                    )}
                    {/* <Link to="/login">Login</Link> */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
