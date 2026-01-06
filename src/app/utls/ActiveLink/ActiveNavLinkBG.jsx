'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
const ActiveNavLinkBG = ({ to, click, children }) => {
    const pathname = usePathname()

    return (
        <Link onClick={click} href={to} className={`${pathname == to ? "font-bold bg-base-300  text-custom-blue  italic" : "hover:bg-custom-blue "} px-4 py-1 capitalize rounded`}>
            {children}
        </Link>
    );
};

export default ActiveNavLinkBG;
