import ActiveLink from "@/app/utls/ActiveLink/ActiveLink";
import { useState } from "react";

function LinkUiGenerator({ links, click }) {
    return links.map((linkObject, index) => {
        if (linkObject.children) return <LinkUiDropDown key={linkObject.label + "-lg-drop"} linkObject={linkObject}></LinkUiDropDown>;
        return <ActiveLink click={click} key={linkObject.label + "-lg"} to={`${linkObject.href}`}>{linkObject.label}</ActiveLink>
    })
}
function LinkUiDropDown({ linkObject, click }) {
    const [open, setOpen] = useState(false);
    return <div className={`w-full flex flex-col   ${open ? "" : "border-s-transparent"}`}>
        <div className={`relative w-full flex  ${open ? "bg-gray-700" : ""} mb-2 items-center`}>
            <ActiveLink click={click} keyId={linkObject.label + "-lg-link"} to={linkObject.href}>{linkObject.label}</ActiveLink>
            <button className={`${open ? "px-2 bg-gray-500" : "px-1 bg-gray-700"} pt-1  hover:bg-gray-500  font-bold  text-2xl cursor-pointer self-stretch`} onClick={() => setOpen(!open)}>{open ? "-" : "+"}</button>

        </div>
        <div className={`flex flex-col gap-1 border-s-2 ${open ? "block border-s-gray-600" : "hidden border-s-transparent"} ps-2`}>
            {<LinkUiGenerator links={linkObject?.children} />}
        </div>
    </div >
}

export default LinkUiGenerator