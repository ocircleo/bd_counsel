"use client";
import React, { useState } from "react";
import Link from "next/link";

import { MdOutlineWbSunny } from "react-icons/md";

import nav from "./nav.module.css";
import LinkUiGenerator from "../components/SidebarLinkUiGenerator/LinkUIGEnerator";


const dashboardLinks = [
    {
        label: "Admin",
        href: "/admin",
        description: "Manage users, search, change roles"
    },
    {
        label: "Users",
        href: "/admin/users",
        description: "Manage users, search, change roles"
    },
    {
        label: "Courses",
        href: "/admin/courses",
        description: "Manage courses",
        children: [
            { label: "Add Course", href: "/admin/add-course" },
        ]
    },
    // {
    //     label: "Broadcast Message",
    //     href: "/admin/broadcast",
    //     children: [
    //         { label: "Email", href: "/admin/broadcast/email" },
    //         { label: "In-app Message", href: "/admin/broadcast/inapp" },
    //         { label: "SMS", href: "/admin/broadcast/sms" },
    //     ],
    // },
    // {
    //     label: "Receive Messages",
    //     href: "/admin/messages",
    //     children: [
    //         { label: "Email Inbox", href: "/admin/messages/email" },
    //         { label: "Web Inbox", href: "/admin/messages/web" },
    //         { label: "Reply", href: "/admin/messages/reply" },
    //     ],
    // },
    // {
    //     label: "Stats",
    //     href: "/admin/stats",
    //     children: [
    //         {
    //             label: "User/Mentor Stats",
    //             href: "/admin/stats/user",
    //             children: [
    //                 { label: "Purchases", href: "/admin/stats/user/purchases" },
    //                 { label: "Active Courses", href: "/admin/stats/user/active-courses" },
    //                 { label: "Completions", href: "/admin/stats/user/completions" },
    //                 { label: "Profile Details", href: "/admin/stats/user/profile" },
    //             ],
    //         },
    //         {
    //             label: "Course Stats",
    //             href: "/admin/stats/course",
    //             children: [
    //                 { label: "Total Classes", href: "/admin/stats/course/classes" },
    //                 { label: "Enrolled Students", href: "/admin/stats/course/enrolled" },
    //                 { label: "Active vs Completed", href: "/admin/stats/course/progress" },
    //                 { label: "Ratings", href: "/admin/stats/course/ratings" },
    //             ],
    //         },
    //         {
    //             label: "Platform Stats",
    //             href: "/admin/stats/platform",
    //             children: [
    //                 { label: "Revenue", href: "/admin/stats/platform/revenue" },
    //                 { label: "DAU/MAU", href: "/admin/stats/platform/dau-mau" },
    //                 { label: "Conversion", href: "/admin/stats/platform/conversion" },
    //                 { label: "Retention", href: "/admin/stats/platform/retention" },
    //                 { label: "NPS", href: "/admin/stats/platform/nps" },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     label: "Role & Permission Management",
    //     href: "/admin/roles",
    // },
    // {
    //     label: "Content Moderation",
    //     href: "/admin/moderation",
    //     children: [
    //         { label: "Flagged Content Review", href: "/admin/moderation/flagged" },
    //     ],
    // },
    // {
    //     label: "System Logs & Audit Trail",
    //     href: "/admin/logs",
    // },
    // Add other useful links for admin
    // {
    //     label: "Settings",
    //     href: "/admin/settings",
    //     children: [
    //         { label: "Password", href: "/admin/settings/password" },
    //         { label: "2FA", href: "/admin/settings/2fa" },
    //         { label: "Language", href: "/admin/settings/language" },
    //         { label: "Time Zone", href: "/admin/settings/timezone" },
    //     ],
    // },
    {
        label: "Home",
        href: "/",
    },
];

const Sidebar = ({ navState, toggleNav }) => {
    const changeTheme = () => {
        let theme_icon = document.getElementById("theme-controller")
        theme_icon.click()
    }
    return (
        <aside className={` hidden lg:w-64  bg-gray-800 text-white h-screen overflow-y-hidden  sticky top-0 lg:flex flex-col gap-2 justify-between`}>
            <div>
                <p className="text-xl font-bold text-center py-3  border-b-2">Admin Panel</p>
                <div className="flex flex-col gap-2 px-2 pb-12 overflow-y-auto small-scrollbar">
                    <LinkUiGenerator links={dashboardLinks} />
                </div>
            </div>
            <div className="bg-gray-900 py-3 flex flex-col gap-2 px-4 select-none">
                <div className="flex bg-gray-800 p-2 rounded justify-between cursor-pointer items-center" onClick={changeTheme}>
                    <p>Theme</p>
                    < MdOutlineWbSunny className="text-2xl" />
                </div>
                <Link href={"/"} className="flex bg-gray-800 p-2 rounded justify-between cursor-pointer hover:bg-gray-700">
                    Back To Home

                </Link>
            </div>
        </aside>
    );
};

const MobileSidebar = ({ navState, toggleNav }) => {
    return (
        <div className={`lg:hidden top-0 w-full sm:w-64 bg-[#194164] h-full overflow-y-scroll flex flex-col gap-2 px-2 pt-3 pb-12 fixed duration-100 ${!navState ? "-left-full sm:-left-64" : "left-0"} z-20`}>
            <p className="text-xl font-bold text-center py-3  border-b-2">Admin Panel</p>
            <div className="flex flex-col gap-2 px-2 pb-12 overflow-y-auto small-scrollbar">
                <LinkUiGenerator links={dashboardLinks} click={toggleNav} />
            </div>
        </div>
    );
};

export default function DashboardLayout({ children }) {
    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState((prev) => !prev);
    return (
        <div className="layout-xx-container flex gap-8 relative">
            <Sidebar navState={navState} toggleNav={toggleNav} />
            <MobileSidebar navState={navState} toggleNav={toggleNav} />
            <div className={`h-full w-full bg-gray-900/35 fixed top-0 left-0 z-0 ${navState ? "block" : "hidden"}`} onClick={toggleNav}></div>
            <div
                onClick={toggleNav}
                className={`h-10 w-10 cursor-pointer rounded flex gap-[3px] bg-[#194164] p-1 items-center justify-center flex-col lg:hidden fixed right-3 top-3 sm:top-6 sm:right-6 active:scale-90 duration-100 z-50`}
            >
                <div className={`h-[6px] bg-white w-full duration-200 rounded-[2px] ${navState ? nav.active : nav.default}`}></div>
                <div className={`h-[6px] bg-white w-full duration-200 rounded-[2px] ${navState ? nav.base : nav.baseDefault}`}></div>
                <div className={`h-[6px] bg-black w-full duration-200 rounded-[2px] ${navState ? nav.active2 : nav.default2}`}></div>
            </div>
            <div className="flex-1   overflow-x-hidden scroll-rock rounded">
                {children}
            </div>
        </div>
    );
}

// function LinkUiGenerator({ links, click }) {
//     return links.map((linkObject, index) => {
//         if (linkObject.children) return <LinkUiDropDown key={linkObject.label + "-lg-drop"} linkObject={linkObject}></LinkUiDropDown>;
//         return <ActiveLink click={click} key={linkObject.label + "-lg"} to={`${linkObject.href}`}>{linkObject.label}</ActiveLink>
//     })
// }
// function LinkUiDropDown({ linkObject, click }) {
//     const [open, setOpen] = useState(false);
//     return <div className={`w-full flex flex-col   ${open ? "" : "border-s-transparent"}`}>
//         <div className={`relative w-full flex  ${open ? "bg-gray-700" : ""} mb-2 items-center`}>
//             <ActiveLink click={click} keyId={linkObject.label + "-lg-link"} to={linkObject.href}>{linkObject.label}</ActiveLink>
//             <button className={`${open ? "px-2 bg-gray-500" : "px-1 bg-gray-700"} pt-1  hover:bg-gray-500  font-bold  text-2xl cursor-pointer self-stretch`} onClick={() => setOpen(!open)}>{open ? "-" : "+"}</button>

//         </div>
//         <div className={`flex flex-col gap-1 border-s-2 ${open ? "block border-s-gray-600" : "hidden border-s-transparent"} ps-2`}>
//             {<LinkUiGenerator links={linkObject?.children} />}
//         </div>
//     </div >
// }
/*
1. takes in an argument which is an array of objects
2. if array:
   -> loop over array 
      -> if object has children, render a button to toggle children visibility
       ->  when button is clicked, toggle visibility of children links
       ->  pass it to the LinkUiGenerator
      
     ->else Just call the LinkUiGenerator passing the object
3. if not array: it will render a single link

*/