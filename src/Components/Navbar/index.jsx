import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { ShoppingBagIcon } from '@heroicons/react/24/solid'

const Navbar = () => {
    const context = useContext(ShoppingCartContext);
    const activeStyle = 'underline underline-offset-4'

    return (
        <nav className='flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-normal top-0 bg-white'>
            <ul className='flex items-center gap-5'>
                <li className='font-semibold text-lg'>
                    <NavLink to='/'>
                        Shopi   
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={() => context.setSearchByCategory()} to='/all' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={() => context.setSearchByCategory('clothes')} to='/clothes' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={() => context.setSearchByCategory('electronics')} to='/electronics' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={() => context.setSearchByCategory('furnitures')} to='/furnitures' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={() => context.setSearchByCategory('toys')} to='/toys' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Toys
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={() => context.setSearchByCategory('others')} to='/others' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Others
                    </NavLink>
                </li>
            </ul>

            <ul className='flex items-center gap-4'>
                <li className='text-black/60'>
                    eccomerce@gmail.com
                </li>
                <li>
                    <NavLink to='/my-orders' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/my-account' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sig-in' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        Sign In
                    </NavLink>
                </li>
                <li className="flex justify-center gap-1 items-center">
                    <ShoppingBagIcon className="h-6 w-6"/> 
                    {context.cartProducts.length}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;