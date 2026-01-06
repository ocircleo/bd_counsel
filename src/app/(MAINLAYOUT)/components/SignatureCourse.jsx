import API from "@/app/components/API";
import Image from "next/image";
import Link from "next/link";

const returnImageIndex = (index, type = "num") => {
    index++;

    if (index > 3) index = index % 3 == 0 ? 3 : index % 3;
    let alphabet = ["x", "y", "z"];
    if (type == "num") return index;
    return alphabet[index - 1];
};

const SignatureCourse = async () => {
    try {
        const req = await fetch(API + "/common/get-courses?limit=12");
        const res = await req.json();
        const data = (await res?.data);
        if (!data) throw ("Data not defined")
        if (data.length == 0) throw ("Load failed");
        return (
            <div className=' flex gap-4 shrink-0 flex-nowrap overflow-x-scroll md:overflow-x-hidden py-2 w-full'>
                {
                    data.map((ele, index) => <Card key={index + "sig-course"} data={ele}></Card>)
                }
            </div>)

    } catch (error) {
        console.log(error);
        return <div className=" w-full">
            <div className=' w-full bg-base-100  text-white'>
                <div className=' text-2xl capitalize font-bold text-center text-orange-600 py-14'>
                    Failed to load Data
                </div>
            </div>
        </div>
    }
}

export default SignatureCourse;

function Card({ data }) {
    return (<>
        <Link href={`/courses/${data?._id || "/not-found"}`}>
            <div className='shadow-sm rounded p-1  shrink-0 w-full xxs:w-64 cursor-pointer  bg-base-100 hover:bg-base-200 text-base-100'>
                <div className='relative'>
                    <div className="absolute top-0 left-0 w-full h-full z-20">
                        <div className='absolute top-3 left-2 bg-gray-100/30 font-bold backdrop-blur-2xl px-3 rounded-full py-1 text-sm shadow'>⭐ {data?.ratings || 0} ({data?.ratingCount || 0})</div>
                        <p className="absolute bottom-3 left-3 text-sm text-white font-bold">{data?.title || "Loading Failed"}</p>

                    </div>
                    <div style={{ boxShadow: "0 0 25px rgba(0,0,0,.25) inset", }} className="z-10 h-full w-full bg-transparent rounded-lg absolute top-0 left-0  "></div>
                    <Image height={320} width={256} src={data?.course_image ? data?.course_image : '/images/courses/failed_vertical.png'} alt="" className='w-full xxs:w-64 h-auto aspect-[4/5] rounded-lg bg-base-100 object-cover  ' />
                </div>
            </div>
        </Link>
    </>)
}
