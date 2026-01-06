'use client';
import { useContext, useEffect, useState } from 'react';
import ThemeButton from "@/app/components/theme/ThemeButton"
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import Link from 'next/link'
import { AuthContext } from '@/app/state/AuthProvider';
import ActiveNavLink from '@/app/utls/ActiveLink/ActiveNavLink';
import ActiveLink from '@/app/utls/ActiveLink/ActiveLink';
import ActiveNavLinkBG from '@/app/utls/ActiveLink/ActiveNavLinkBG';
import Image from 'next/image';

const NavbarCompo = ({ data }) => {
    const [show, setShow] = useState(false);
    const toggleNav = () => {
        setShow(!show);
    };
    const { fetchUserData, user } = useContext(AuthContext)
    useEffect(() => {
        if (data == undefined) return;
        fetchUserData(data);
    }, [user]);
    return (
        <div className='bg-base-100'>
            <div className="navbar  h-20  w-full lg:w-[90%] mx-auto">
                {/* logo */}
                <div className="navbar-start">
                    <Link href={"/"} className="cursor-pointer"><Image width={136} height={43} src={"/images/logos/logo.png"} alt="alt" className=' w-34 mx-2 rounded' /></Link>
                    <div className=" hidden lg:flex font-semibold">
                        <ul className="flex gap-2 ms-4">
                            <li>
                                <ActiveNavLinkBG click={null} to={"/"}>Home</ActiveNavLinkBG>

                            </li>
                            <li>
                                <ActiveNavLinkBG click={null} to={'/branch'}>Branch</ActiveNavLinkBG>

                            </li>


                        </ul>
                    </div>
                </div>

                {/* side icons for profile and search and hamburger*/}
                <div className="navbar-end">
                    <Search />
                    <ThemeButton />
                    <Profile user={user} />

                    {/* small screen dropdown */}
                    <div className="lg:hidden">

                        <div role="button" onClick={toggleNav} className="btn btn-ghost btn-circle">
                            <GiHamburgerMenu className='text-2xl' />
                        </div>
                        <div
                            id='dropdown'
                            className={`bg-base-300  z-50  fixed ${show ? "left-0" : "left-full"} duration-100 top-0 shadow w-full h-screen`}>
                            <Dropdown toggleNav={toggleNav} user={user} />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NavbarCompo;


function Profile({ user }) {
    return (<>
        <div className="hidden lg:dropdown dropdown-end">
            {/* if user is not logged in then show this dropdown */}
            {user?.email ? <>
                {/* If User is  logged in then show this dropdown */}
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold pt-1">
                        <p>
                            {user?.name ? user?.name.charAt(0).toUpperCase() : "U"}

                        </p>
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><Link href={user?.role == "admin" ? "/admin" : "/dashboard"}>{user?.name ? user?.name : "profile"}</Link></li>
                    <li><Link href={"/logout"}>Logout</Link></li>
                </ul>
            </> :
                <>
                    <div tabIndex={1} role="button" className="btn btn-ghost btn-circle avatar ms-8">
                        <button className='btn bg-custom-blue text-white'>Get Started</button>
                    </div>
                    <ul
                        tabIndex={1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link href="/login">Login</Link></li>
                        <li><Link href="/register">Register</Link></li>
                    </ul>
                </>}

        </div>
    </>)
}

function Search() {
    return (<>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn border-none lg:hidden" onClick={() => document.getElementById('my_modal_2').showModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
        </button>
        {/* This is a modal. for small screen */}
        <dialog id="my_modal_2" className="modal modal-top lg:hidden">

            <div className="modal-box pb-8" >
                {/* This form will close the modal when clicked. */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {/*-------------- Main Modal Content----------------- */}
                <h3 className="font-bold pb-4">Perform Search </h3>
                <div className="join lg:hidden  rounded bg-accent w-full">
                    <input type="text" className="input join-item border-0 bg-base-300 focus:outline-0 w-full" placeholder="Search" />
                    <button className="btn  bg-base-300 join-item " >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                    </button>
                </div>
            </div>
            {/* This form will close the modal if clicked outside (dialog method closes a modal) */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>


        {/* This is default searchbar for large screen */}
        <div className="hidden lg:join  rounded-full bg-accent">
            <input type="text" className="input join-item border-0 bg-base-300 focus:outline-0 w-60" placeholder="Search" />
            <button className="btn  bg-base-300 join-item " >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
            </button>
        </div>
    </>)
}

function Dropdown({ toggleNav, user }) {
    return (<>
        <div className='navbar justify-between w-full h-20  items-center'>
            <Link href={"/"} className="cursor-pointer"><Image width={136} height={43} src={"/images/logos/logo.png"} alt="alt" className=' w-34 mx-2 rounded' /></Link>
            <button className="btn btn-sm btn-circle btn-ghost  text-lg" onClick={toggleNav}><RxCross1 className='text-xl font-semibold' /></button>
        </div>

        <ul className="menu gap-1 bg-base-200 rounded-box w-full h-full overflow-y-scroll
        ">
            <li>
                <ActiveNavLinkBG click={toggleNav} to={"/"}>Home</ActiveNavLinkBG>

            </li>
            <li>
                <ActiveNavLinkBG click={toggleNav} to={'/branch'}>Branch</ActiveNavLinkBG>

            </li>
            <li>
                <DropdownSubMenuAccount user={user} />
            </li>
        </ul>
    </>)
}
function DropdownSubMenuAccount({ user }) {

    return (<>
        {
            user?.email ? <>
                {/* If User is logged in then show this dropdown */}
                <details open>
                    <summary className='bg-base-300'>
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                            {user?.name ? user?.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        Account
                    </summary>
                    <ul>

                        <li><Link href={user?.role == "admin" ? "/admin" : "/dashboard"}>{user?.name ? user?.name : "profile"}</Link></li>
                        <li><Link href={"/logout"}>Logout</Link></li>

                    </ul>
                </details>

            </> : <> {/* If User is not logged in then show this dropdown */}
                <details open>
                    <summary className='bg-base-300'>Get Started</summary>
                    <ul>
                        <li><Link href={"/login"}>Login</Link></li>
                        <li><Link href={"/register"}>Register</Link></li>

                    </ul>
                </details></>
        }





    </>)
}

