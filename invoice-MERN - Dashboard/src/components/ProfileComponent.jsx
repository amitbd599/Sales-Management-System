import React, { useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { ErrorToast, getBase64 } from '../helper/helper';

const ProfileComponent = () => {
    let [bgImg, setBgImg] = useState("");
    const bgHandel = (event) => {
        const file = event.target.files[0];
        if (file.size > 100 * 1024) {
            ErrorToast("File size exceeds 100KB.");
        } else {
            getBase64(event.target.files[0]).then((base64Img) => {
                setBgImg(base64Img);
            });
        }
    };
    return (
        <section>
            {/* {loading === true && <Loading />} */}
            <div className="px-[40px] py-[40px]">
                <div className='bg-white rounded-md  p-[20px]'>
                    {/* info section */}
                    <div>
                        <h2 className="font-semibold text-[26px] mb-3">Change user info:</h2>
                        <div className="flex w-full gap-[30px] ">
                            <div className=" relative w-[300px]">
                                <h2 className="font-semibold pb-2">Change profile image</h2>
                                <label
                                    htmlFor="bg"
                                    className=" cursor-pointer flex w-full   flex-col items-center rounded-xl border-2 border-dashed border-primary bg-white p-6 text-center"
                                >
                                    <div>
                                        {bgImg ? (
                                            <div>
                                                <img
                                                    src={bgImg}
                                                    alt="Selected"
                                                    className="w-[100px] rounded-xl"
                                                />
                                            </div>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                                        Change image
                                    </h2>
                                    <p className="mt-2 text-gray-500 tracking-wide">
                                        Upload file PNG only.
                                    </p>
                                    <p className="text-red-500">Max 100kb</p>
                                    <input
                                        id="bg"
                                        type="file"
                                        className="hidden"
                                        onChange={(event) => bgHandel(event)}
                                    />
                                </label>
                                {bgImg && (
                                    <div>
                                        <FaXmark
                                            onClick={() => setBgImg("")}
                                            className="absolute cursor-pointer right-[-22px] z-[999] top-[-10px] p-2 text-[50px] text-red-600"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className='mt-[30px]'>
                        <h2 className="font-semibold mb-3">Setting your company info:</h2>
                        <div className="grid grid-cols-12 gap-[20px]">
                            <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="grid gap-1">
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        className="input_box"

                                    />
                                </div>
                            </div>
                            <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="grid gap-1">
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        className="input_box"

                                    />
                                </div>
                            </div>
                            <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="grid gap-1">
                                    <label>Phone number:</label>
                                    <input
                                        type="text"
                                        className="input_box"

                                    />
                                </div>
                            </div>
                            <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="grid gap-1">
                                    <label>Current Password:</label>
                                    <input
                                        type="text"
                                        className="input_box"

                                    />
                                </div>
                            </div>
                            <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="grid gap-1">
                                    <label>New Password:</label>
                                    <input
                                        type="text"
                                        className="input_box"

                                    />
                                </div>
                            </div>
                            <div className="w-full col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="grid gap-1">
                                    <label>Confirm Password:</label>
                                    <input
                                        type="text"
                                        className="input_box"

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 block">
                        <button
                            className="px-[20px] py-[8px]  rounded-md bg-primary text-white"
                        //   onClick={saveData}
                        >
                            Update profile
                        </button>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default ProfileComponent