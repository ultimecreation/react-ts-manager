import { use } from 'react'
import { NavLink } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const authContext = use(AuthContext)
    return (

        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container">
                <NavLink className="navbar-brand" to={"/"}>Task Manager</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {authContext?.isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link " aria-current="page" to={"/tasks"}>Tasks</NavLink>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " aria-current="page" href="#" onClick={authContext.logout}>Logout</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={"/login"}>Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={"/register"}>Register</NavLink>
                                </li>
                            </>
                        )}





                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar