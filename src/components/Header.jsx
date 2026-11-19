import { NavLink } from "react-router-dom"

const LinkClass = ({ IsActive }) =>
    `text-1xl font-bold  transition hover:text-green-700 ${IsActive ? "text-green-500" :"" }`

export default function Header(){
    return(
        <header className="flex item-center justify-between bg-white px-8 py-4   ">
            <h1 className="text-3xl font-bold text-green-800">IONMITRRA</h1>

         <div className="flex gap-6">
            <NavLink to="/" end className={LinkClass}>Home</NavLink>  
            <NavLink to="/products"  className={LinkClass}>Products</NavLink> 
            <NavLink to="/cart"  className={LinkClass}><i className="bi bi-cart"></i></NavLink>
            </div>   
        </header>
    );
}


