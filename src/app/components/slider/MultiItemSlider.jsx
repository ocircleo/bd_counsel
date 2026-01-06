"use client";
import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const MultiItemSlider = ({ children }) => {
    const [btnSelected, setBtnSelected] = useState(false)
    const [totalItems, setTotalItems] = useState(1)
    const [activeItem, setActiveItem] = useState(1)
    let container = useRef(null);
    let updateActiveItem = (method) => {
        if (method) { //true means increment
            let tem_active_item = activeItem + 1;
            if (tem_active_item > totalItems) {
                setActiveItem(totalItems)
            } else {
                setActiveItem(tem_active_item)
            }

        } else {
            let tem_active_item = activeItem - 1;
            if (tem_active_item < 1) {
                setActiveItem(1)
            } else {
                setActiveItem(tem_active_item)
            }
        }
    }
    const scrollLeft = (e) => {

        setBtnSelected(true)
        let card_width = 320;
        let ScrollElement, windowWidth;
        windowWidth = window.innerWidth;

        ScrollElement = container.current.children[0];

        if (windowWidth < 768) card_width = ((windowWidth / 100) * 80) + 20
        else {
            let tem_width = Number(ScrollElement.children[0].offsetWidth)
            card_width = (tem_width ?? 320) * 2;
        }

        ;
        let to = ScrollElement.scrollLeft - card_width;

        ScrollElement.scrollTo({
            top: 0,
            left: to,
            behavior: 'smooth',
        })
        updateActiveItem(false)
    }
    const scrollRight = (e) => {
        setBtnSelected(false)
        let card_width = 320;
        let ScrollElement, windowWidth;
        windowWidth = window.innerWidth;

        ScrollElement = container.current.children[0];

        if (windowWidth < 768) card_width = ((windowWidth / 100) * 80) + 20;
        else {
            let tem_width = Number(ScrollElement.children[0].offsetWidth)
            card_width = (tem_width ?? 320) * 2;
        }

        let to = ScrollElement.scrollLeft + card_width;

        ScrollElement.scrollTo({
            top: 0,
            left: to,
            behavior: 'smooth',
        })
        updateActiveItem(true)
    }
    useEffect(() => {
        let card_width = 320;

        let ScrollElement, windowWidth;
        windowWidth = window.innerWidth;
        ScrollElement = container.current.children[0];
        console.log(ScrollElement);
        if (windowWidth <= 768) card_width = windowWidth
        else {
            let tem_width = Number(ScrollElement.children[0].offsetWidth)
            card_width = (tem_width ?? 320) * 2;
        }
        let nearest_total_items = Math.floor(ScrollElement.scrollWidth / card_width);
        setTotalItems(nearest_total_items);

        const handelTouchEnd = (e) => {
            if (windowWidth > 768) return;
            let scrollLeft = ScrollElement.scrollLeft;
            let scrollCount = Math.trunc(scrollLeft / card_width);
            let scrollCountExtra = scrollLeft % card_width;

            let total_scroll_count = scrollCount + (scrollCountExtra > (card_width / 2) ? 1 : 0);
            setActiveItem(total_scroll_count == 0 ? 1 : total_scroll_count);

        }
        ScrollElement.addEventListener("scrollend", handelTouchEnd)
        return () => ScrollElement.removeEventListener("scrollend", handelTouchEnd)
    }, [])
    return (
        <div>
            <div ref={container} className='relative w-full h-full flex flex-row flex-1 gap-2 md:overflow-x-hidden  select-none '>
                {children}
            </div>
            <div className='flex items-center justify-between gap-4 py-4'>
                <div className='flex-nowrap shrink-0 font-bold flex gap-1 text-gray-400'><button className='text-custom-blue'>{activeItem}</button><p>/</p><button>{totalItems}</button></div>
                <hr className='text-gray-300 w-full'></hr>
                <div className='flex-nowrap shrink-0 flex gap-2'>

                    <button className={`active:scale-95  rounded-full p-2 cursor-pointer duration-100 border-0 hover:text-white hover:bg-warning ${btnSelected ? "bg-custom-blue text-white" : "bg-[#E7E7E7] text-[#B9B9B9]"}`} onClick={scrollLeft}><FaArrowLeft /></button>

                    <button onClick={scrollRight} className={`active:scale-95  rounded-full p-2 cursor-pointer duration-100 border-0 hover:text-white hover:bg-warning ${btnSelected ? "bg-[#E7E7E7] text-[#B9B9B9]" : "bg-custom-blue text-white"}`} ><FaArrowRight /></button>
                </div>
            </div>

        </div >
    );
}

export default MultiItemSlider;
