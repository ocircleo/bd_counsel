import { RiLayout2Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { AiFillLike } from "react-icons/ai";
import Image from "next/image";
const Discover = () => {
    return (<div className='flex flex-col w-full bg-base-100 mt-12 p-4'>
        <div className='lg:hidden  items-center justify-center'>
            <ChooseUsTitle></ChooseUsTitle>
        </div>
        <div className='grid grid-cols-5 w-full '>
            <div className='col-span-5 lg:col-span-2 relative w-full  h-full  flex items-center justify-center'>
                <Image width={484} height={560} src={'/images/images/imagebg.png'} alt="" className='z-0 absolute bottom-0 w-full md:w-[28rem] aspect-[4/5] object-cover' />
                <Image width={448} height={560} src={'/images/images/discover.png'} alt="" className='z-10 w-full md:w-[28rem] aspect-[4/5] object-cover' />
            </div>
            <div className='col-span-5 lg:col-span-3  '>
                <div className=" w-full h-full ">
                    <ChooseUs></ChooseUs>

                </div>
            </div>




        </div>
    </div>);
}

export default Discover;

function ChooseUs() {
    return (<div className=' flex flex-col h-full justify-center'>

        <div className='hidden lg:flex flex-col px-10 lg:px-0 py-4'><p className='text-xs font-bold px-2 py-1 inline-block self-center lg:self-start bg-info/10 rounded-full text-custom-blue '>WHY CHOOSE US</p>
            <p className='text-2xl lg:text-4xl font-bold text-center lg:text-start'>Discover the Distinct <br /> Advantages of Our Online Courses</p>
        </div>

        <div className='grid grid-cols-2 gap-4 grid-rows-2 p-4 '>
            <div className='col-span-1  rounded  bg-base-200 flex flex-col gap-2 shadow px-5 py-3 h-full' >
                <RiLayout2Fill className='text-custom-blue text-2xl'></RiLayout2Fill>
                <p className='inline-block self-start font-bold'>Diverse Courses</p>
                <p>Explore a diverse range of courses tailored to your interests and career goals.</p>
            </div>
            <div className='col-span-1  rounded  bg-base-200 flex flex-col gap-2 shadow px-5 py-3 h-full' >
                <FaUsers className='text-custom-blue text-2xl'></FaUsers>
                <p className='inline-block self-start font-bold'>Expert Instructors</p>
                <p>Learn from industry experts dedicated to your educational success.</p>
            </div>
            <div className='col-span-1  rounded  bg-base-200 flex flex-col gap-2 shadow px-5 py-3 h-full' >
                <LuCalendarClock className='text-custom-blue text-2xl'></LuCalendarClock>
                <p className='inline-block self-start font-bold'>Flexible Schedule</p>
                <p>Learn at your own pace with flexible scheduling options to fit your busy lifestyle..</p>
            </div>
            <div className='col-span-1  rounded  bg-base-200 flex flex-col gap-2 shadow px-5 py-3 h-full' >
                <AiFillLike className='text-custom-blue text-2xl'></AiFillLike>
                <p className='inline-block self-start font-bold'>Continuous Support</p>
                <p>Receive ongoing support and access additional resources for an enriching learning journey.</p>
            </div>


        </div>
    </div>)

}
function ChooseUsTitle() {
    return (<div className='flex flex-col px-10 lg:px-0 py-4'><p className='text-xs font-bold px-2 py-1 inline-block self-center lg:self-start bg-info/10 rounded-full text-custom-blue '>WHY CHOOSE US</p>
        <p className='text-2xl lg:text-4xl font-bold text-center lg:text-start'>Discover the Distinct Advantages of Our Online Courses</p>
    </div>)
}