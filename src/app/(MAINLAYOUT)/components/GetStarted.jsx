import Image from "next/image";

const GetStarted = () => {
    return (
        <div className='grid grid-cols-5 p-5 bg-subtle-blue mt-4 rounded-lg '>
            <div className='col-span-5 lg:col-span-2 min-h-[400px] lg:h-full gap-5'>

                <div className="hero  w-full h-full">
                    <div className="hero-content flex-col lg:flex-row-reverse">

                        <div>
                            <h1 className="text-4xl font-bold">Unlock Your Potential with Online Learning</h1>
                            <p className="py-6">
                                Embark on a journey of knowledge and skill enhancement with our online courses. Whether you're looking to acquire new expertise or refine existing talents, our diverse range of courses offers a flexible and engaging learning experience. Empower yourself today!
                            </p>
                            <div className='flex gap-4'>
                                <button className="btn bg-custom-blue rounded-full text-white">Get Started</button>
                                <button className="btn btn-outline border-custom-blue text-custom-blue rounded-full ">Learn More</button>

                            </div>
                            <div className='flex gap-2 my-4 flex-col xxs:flex-row'>
                                {/* AVATAR */}
                                <div className="avatar-group -space-x-6">
                                    <div className="avatar">
                                        <div className="w-12">
                                            <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-12">
                                            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-12">
                                            <img src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp" />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-12">
                                            <img src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className='font-semibold'>10k+ Students</p>
                                    <p className='text-sm text-custom-blue'>have started their studies</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-span-5 lg:col-span-3 grid grid-cols-4 h-full w-full'>
                <div className='col-span-4 sm:col-span-3 h-full  '>

                    <div className=" relative flex items-center justify-center h-full">
                        <Image width={484} height={560} src={'/images/images/imagebg.png'} alt="" className='z-0 absolute bottom-0 w-full md:w-[28rem] aspect-[4/5] object-cover' />
                        <Image width={448} height={560}  src={'/images/images/getstarted.png'} alt="" className='z-10 w-full md:w-[28rem] aspect-[4/5] object-cover' />
                    </div>

                </div>
                
                <div className='col-span-4 sm:col-span-1  h-auto flex items-center justify-center sm:justify-start'>

                    <div className="flex flex-row sm:flex-col bg-base-200 shadow rounded-lg  scale-75  xs:scale-90 sm:scale-100 ">
                        <div className="stat">
                            <div className="stat-value text-info">10K+</div>
                            <div className="stat-desc text-center font-bold text-neutral">Alumni</div>
                        </div>

                        <div className="stat">
                            <div className="stat-value text-info ">4.6</div>
                            <div className="stat-desc text-center text-neutral font-bold">5k+ Reviews</div>
                        </div>

                        <div className="stat">
                            <div className="stat-value text-info">100+</div>
                            <div className="stat-desc text-center text-neutral font-bold">Partnerships</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default GetStarted;

