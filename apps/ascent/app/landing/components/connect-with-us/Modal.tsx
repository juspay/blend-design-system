// components/connect-with-us/Modal.tsx
import React from 'react'

export const Modal = ({ onClose }: { onClose: () => void }) => {
    return (
        // The overlay to dim the background and handle clicks
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* The modal's main container */}
            <div
                className="bg-[#2E2E2E] p-8 rounded-2xl w-[600px] shadow-lg relative"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white font-semibold">
                        We're always listening.
                    </h2>
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition-colors"
                    >
                        &times;
                    </button>
                </div>
                <p className="text-[#9E9E9E] mb-6">
                    Whether it's feedback, a bug, or a bright idea - let's make
                    this system better together.
                </p>

                {/* Form fields based on your design */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Input for Full Name */}
                    <input
                        type="text"
                        placeholder="Your Full Name"
                        className="bg-[#1C1C1C] text-white rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#B3B3B3]"
                    />
                    {/* Input for Email */}
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="bg-[#1C1C1C] text-white rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#B3B3B3]"
                    />
                    {/* Other input fields */}
                    <input
                        type="tel"
                        placeholder="Your Contact Number"
                        className="bg-[#1C1C1C] text-white rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#B3B3B3] col-span-2"
                    />
                    <textarea
                        placeholder="Your Message"
                        rows={4}
                        className="bg-[#1C1C1C] text-white rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-[#B3B3B3] col-span-2"
                    ></textarea>
                </div>
                {/* Email address */}
                <div className="mt-6 text-[#B3B3B3] text-sm">
                    <p>Email Us</p>
                    <p className="font-medium text-white">
                        design.system@company.com
                    </p>
                </div>

                {/* Submit buttons */}
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full border border-gray-500 text-gray-400 hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2 rounded-full border border-white text-white hover:bg-gray-200 hover:text-black">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
