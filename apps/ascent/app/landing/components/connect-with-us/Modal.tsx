// components/connect-with-us/Modal.tsx
import React from 'react'

export const Modal = ({ onClose }: { onClose: () => void }) => {
    return (
        // The overlay to dim the background and handle clicks
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className=" w-[80vw] rounded-[50px] p-[100px] flex gap-[136px]"
                style={{
                    background:
                        'linear-gradient(0deg, #0E0E0E 0%, #0E0E0E 100%), linear-gradient(180deg, #101010 0%, #FFF 100%), #FFF',
                }}
            >
                <div className="py-[30px] flex flex-col justify-between w-full">
                    <div className="flex flex-col gap-[50px]">
                        <p className="text-[#9E9E9E] text-[45px] font-[400]">
                            We're always listening.
                        </p>
                        <p className="text-[#4F4F4F] font-[300] text-[30px]">
                            Whether it’s feedback, a bug, or a bright idea —
                            let’s make this system better together.
                        </p>
                    </div>
                    <div className="flex flex-col text-[#9F9F9F] font-[300] text-[30px]">
                        <p>Email Us</p>
                        <p>designsystem@company.com</p>
                    </div>
                </div>

                <div className="w-full bg-white py-[30px] max-h-[80vh] rounded-[45px]">
                    <form className="p-10 flex flex-col gap-6">
                        {/* Full Name Input */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="fullName"
                                className="text-sm text-gray-500"
                            >
                                Your Full Name *
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                placeholder="Your Full Name"
                                className="w-full py-4 px-6 rounded-[20px] bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-sm text-gray-500"
                            >
                                Your Email ID *
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email ID"
                                className="w-full py-4 px-6 rounded-[20px] bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Contact Number Input */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="contactNumber"
                                className="text-sm text-gray-500"
                            >
                                Your Contact Number *
                            </label>
                            <div className="flex items-center gap-2 w-full bg-gray-200 rounded-[20px] px-6">
                                <span className="text-gray-500">+91</span>
                                <input
                                    type="tel"
                                    id="contactNumber"
                                    placeholder=" "
                                    className="flex-1 py-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Industry Dropdown */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="industry"
                                className="text-sm text-gray-500"
                            >
                                Your Industry *
                            </label>
                            <select
                                id="industry"
                                className="w-full py-4 px-6 rounded-[20px] bg-gray-200 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled selected>
                                    Your Industry
                                </option>
                                <option value="tech">Technology</option>
                                <option value="finance">Finance</option>
                                <option value="healthcare">Healthcare</option>
                            </select>
                        </div>

                        {/* Message Textarea */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="message"
                                className="text-sm text-gray-500"
                            >
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                placeholder="Type your message"
                                rows={5}
                                className="w-full py-4 px-6 rounded-[20px] bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                className="py-3 px-8 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="py-3 px-8 rounded-full text-white bg-gray-800 hover:bg-gray-700 transition-colors flex items-center gap-2"
                            >
                                Let's Connect{' '}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
