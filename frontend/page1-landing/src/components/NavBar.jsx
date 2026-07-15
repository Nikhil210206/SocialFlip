import { useState } from "react";
import { Link, Links, useLocation } from "react-router-dom";
import logopng from "../assets/logo.png";
import logo from "../assets/logo.svg";

const NAV_LINKS = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Messages", path: "/messages" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Sell", path: "/sell" },
];

export default function Navar() {
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={logo} alt="fipearn" className="logo" />
            </div>

            <div className="nav-links-container">
                {
                    NAV_LINKS.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link ${isActive ? "active" : ""}`}
                            >
                                {link.name}
                            </Link>
                        );
                    })
                }
            </div>

            <div className="actions-container">
                <Link to="/" className="btn-login">Login</Link>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="btn-hamburger cursor-pointer focus:outline-none">
                    {isMobileMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-[72px] left-0 w-full bg-white flex flex-col items-center py-6 shadow-md lg:hidden z-40 gap-4 border-t border-gray-100">
                    {NAV_LINKS.map((link) => (
                        <Link 
                            key={link.path} 
                            to={link.path}
                            className="text-[#1E2939] hover:text-black font-['Rethink_Sans'] text-[18px] font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link 
                        to="/" 
                        className="mt-2 flex items-center justify-center text-white bg-[#615FFF] hover:bg-[#4F39F6] transition-colors rounded-full h-[44px] px-[32px] w-[200px] font-['Rethink_Sans'] font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    )
}
