import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
    return (
        <>
        <nav className="bg-slate-100">
            <ul className="flex justify-start p-4">
                <li className="text-xl ml-20">
                    <Link to="/">Home</Link>
                </li>
                <li className="text-xl ml-8">
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
        <Outlet />
        </>
    )
}