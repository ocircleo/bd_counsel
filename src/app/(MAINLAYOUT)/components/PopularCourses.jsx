"use client";
import { Suspense, useRef } from "react";
import FavoriteCourses from "@/app/(MAINLAYOUT)//components/FavoriteCourses"
import MultiItemSliderNoCount from "@/app/components/slider/MultiItemSliderNoCount";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import LoadingCards from "@/app/components/LoadingUI/LoadingCards";

const returnImageIndex = (index, type = "num") => {
    index++;

    if (index > 3) index = index % 3 == 0 ? 3 : index % 3;
    let alphabet = ["x", "y", "z"];
    if (type == "num") return index;
    return alphabet[index - 1];
};

const PopularCourses = () => {
    return (
        <div className='bg-base-100 p-4 mt-12'>
            <div className='grid grid-cols-2 mb-4 pb-4 lg:pb-0'>

                <div className='col-span-2 lg:col-span-1 flex flex-col px-10 lg:px-0  items-center lg:items-start gap-2 lg:gap-6 my-8'>
                    <p className='text-xs font-bold px-2 py-1 justify-self-center self-center lg:self-start bg-info/10 rounded-full text-custom-blue '>POPULAR COURSE</p>
                    <p className='text-2xl lg:text-4xl font-bold text-center lg:text-start'>Find Our Favorite Course</p>
                </div>
                <div className='flex justify-center w-full h-full items-center col-span-2 lg:col-span-1 px-4 text-justify font-semibold'>
                    Embark on transformative learning journeys with our most sought-after courses. Join a thriving community of knowledge seekers who have elevated their skills and careers. From cutting-edge technology to timeless business strategies, find the path that suits your aspirations.
                </div>
            </div>
            <PopularCoursesLayout></PopularCoursesLayout>
        </div>
    );
}

export default PopularCourses;

function PopularCoursesLayout() {
    return (<>
        <div className='flex w-full gap-4 h-auto'>
            <div className='w-44 hidden lg:flex flex-col gap-2 border-r-2 border-neutral/10 pr-3'>
                <p className='text-light-gray text-sm font-semibold'>Filter by</p>
                <button className="btn  rounded-full bg-custom-blue text-base-100 h">Courses</button>
                <button className="btn  rounded-full text-neutral hover:bg-custom-blue">Bootcamp</button>
                <button className="btn  rounded-full text-neutral hover:bg-custom-blue">Featured Topics</button>
            </div>
            <div className='flex-grow-1 w-[calc(100%-11rem)] '>
                <div className="flex gap-2">
                    <div className="lg:hidden dropdown">
                        <div tabIndex={0} role="button" className=" cursor-pointer py-1 px-2 text-white bg-custom-blue rounded m-1"><HiOutlineMenuAlt2 className="text-2xl"></HiOutlineMenuAlt2></div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm">

                            <p className='text-light-gray text-sm font-semibold py-2 px-2'>Filter by</p>
                            <button className="btn   bg-custom-blue text-base-100 h">Courses</button>
                            <button className="btn my-2 text-neutral hover:bg-custom-blue">Bootcamp</button>
                            <button className="btn  text-neutral hover:bg-custom-blue">Featured Topics</button>

                        </ul>
                    </div>
                    <CategorySlider>
                        <button className="border-2 border-light-gray cursor-pointer text-light-gray py-1 px-4 hover:border-custom-blue hover:text-custom-blue font-bold rounded-full  capitalize text-xs  shrink-0">all category</button>
                        <button className="border-2 border-light-gray cursor-pointer text-light-gray py-1 px-4 hover:border-custom-blue hover:text-custom-blue font-bold rounded-full  capitalize text-sm shrink-0">Art and Creativity</button>
                        <button className="border-2 border-light-gray cursor-pointer text-light-gray py-1 px-4 hover:border-custom-blue hover:text-custom-blue font-bold rounded-full  capitalize text-sm shrink-0">Language and Communication</button>
                        <button className="border-2 border-light-gray cursor-pointer text-light-gray py-1 px-4 hover:border-custom-blue hover:text-custom-blue font-bold rounded-full  capitalize text-sm shrink-0">Technology and IT</button>
                        <button className="border-2 border-light-gray cursor-pointer text-light-gray py-1 px-4 hover:border-custom-blue hover:text-custom-blue font-bold rounded-full  capitalize text-sm shrink-0">Personal Development</button>
                        <button className="border-2 border-light-gray cursor-pointer text-light-gray py-1 px-4 hover:border-custom-blue hover:text-custom-blue font-bold rounded-full  capitalize text-sm shrink-0">Finance and Investment</button>

                    </CategorySlider>

                </div>
                <div className="w-full">
                    <Suspense fallback={<LoadingCards type={"horizontal"} />}>
                        <MultiItemSliderNoCount>
                            <FavoriteCourses></FavoriteCourses>
                        </MultiItemSliderNoCount>
                    </Suspense>
                </div>
            </div>
        </div>
    </>)
}


function CategorySlider({ children }) {
    let container = useRef(null);

    const scrollLeft = (e) => {
        let scrolling_length = 320;
        let ScrollElement;

        ScrollElement = container.current;


        let to = ScrollElement.scrollLeft - scrolling_length;

        ScrollElement.scrollTo({
            top: 0,
            left: to,
            behavior: 'smooth',
        })
    }
    const scrollRight = (e) => {
        let scrolling_length = 320;
        let ScrollElement;

        ScrollElement = container.current;

        let to = ScrollElement.scrollLeft + scrolling_length;

        ScrollElement.scrollTo({
            top: 0,
            left: to,
            behavior: 'smooth',
        })
    }
    return (<>
        <div className="flex w-full overflow-x-scroll sm:overflow-x-hidden">
            <button onClick={scrollLeft} className="btn h-full btn-circle"><IoIosArrowBack className="text-2xl " /></button>
            <div ref={container} className="flex gap-3 flex-nowrap overflow-x-scroll sm:overflow-x-hidden relative py-0.5 pr-2 ">

                {children}
                <div className="h-full w-16"></div>
            </div>
            <button onClick={scrollRight} className="btn h-full btn-circle"><IoIosArrowForward className="text-2xl " /></button>


        </div>
    </>)
}