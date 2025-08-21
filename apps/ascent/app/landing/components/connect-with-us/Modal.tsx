'use client'

import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

// Define the shape of your form data
interface FormInputs {
    fullName: string
    email: string
    contactNumber: string
    industry: string
    message: string
}

export const Modal = ({ onClose }: { onClose: () => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormInputs>({
        mode: 'onChange', // track validation on change
    })

    // Prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    // This function will be called on successful form submission
    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data)
        onClose() // Close the modal after submission
    }

    return (
        // The overlay to dim the background and handle clicks
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-[80vw] rounded-[50px] p-[50px] flex gap-[136px]"
                style={{
                    background:
                        'linear-gradient(0deg, #0E0E0E 0%, #0E0E0E 100%), linear-gradient(180deg, #101010 0%, #FFF 100%), #FFF',
                }}
                onClick={(e) => e.stopPropagation()}
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

                <div className="w-full bg-white py-[15px] max-h-[80vh] rounded-[45px]">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-10 flex flex-col gap-6"
                    >
                        {/* Full Name Input */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="fullName"
                                className="text-[14px] font-[400] text-[#706E6E]"
                            >
                                Your Full Name
                                <span className="text-[#FF4747]">*</span>
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                className="w-full py-4 px-6 rounded-[20px] bg-[#EFEFEF] text-[#706E6E] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('fullName', { required: true })}
                            />
                            {errors.fullName && (
                                <span className="text-[#FF4747] text-sm">
                                    This field is required
                                </span>
                            )}
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-[14px] font-[400] text-[#706E6E]"
                            >
                                Your Email ID
                                <span className="text-[#FF4747]">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full py-4 px-6 rounded-[20px] bg-[#EFEFEF] text-[#706E6E] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('email', {
                                    required: true,
                                    pattern: /^\S+@\S+$/i,
                                })}
                            />
                            {errors.email && (
                                <span className="text-[#FF4747] text-sm">
                                    Valid email is required
                                </span>
                            )}
                        </div>

                        {/* Contact Number Input */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="contactNumber"
                                className="text-[14px] font-[400] text-[#706E6E]"
                            >
                                Your Contact Number
                                <span className="text-[#FF4747]">*</span>
                            </label>
                            <div className="flex items-center gap-2 w-full bg-[#EFEFEF] rounded-[20px] px-6">
                                <span className="text-[#706E6E]">+91</span>
                                <input
                                    type="tel"
                                    id="contactNumber"
                                    className="flex-1 py-4 bg-transparent text-[#706E6E] placeholder-gray-500 focus:outline-none"
                                    {...register('contactNumber', {
                                        required: true,
                                    })}
                                />
                            </div>
                            {errors.contactNumber && (
                                <span className="text-[#FF4747] text-sm">
                                    This field is required
                                </span>
                            )}
                        </div>

                        {/* Industry Dropdown */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="industry"
                                className="text-[14px] font-[400] text-[#706E6E]"
                            >
                                Your Industry
                                <span className="text-[#FF4747]">*</span>
                            </label>
                            <select
                                id="industry"
                                defaultValue=""
                                className="w-full py-4 px-6 rounded-[20px] bg-[#EFEFEF] text-[#706E6E] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('industry', { required: true })}
                            >
                                <option value="" disabled>
                                    Your Industry
                                </option>
                                <option value="ePharma">E-pharma</option>
                                <option value="investments">Investments</option>
                                <option value="gaming">Gaming</option>
                                <option value="travel">Travel</option>
                                <option value="eCommerce">eCommerce</option>
                                <option value="insurance">Insurance</option>
                                <option value="telecom_d2h">
                                    Telecom / D2H
                                </option>
                                <option value="education">Education</option>
                                <option value="subscription">
                                    Subscription
                                </option>
                                <option value="classified">Classified</option>
                                <option value="fintech">Fintech</option>
                                <option value="grocery_delivery">
                                    Grocery Delivery
                                </option>
                                <option value="lending_repayment">
                                    Lending/Repayment
                                </option>
                                <option value="billpay">Billpay</option>
                                <option value="ticket_booking">
                                    Ticket Booking
                                </option>
                                <option value="food_delivery">
                                    Food Delivery
                                </option>
                                <option value="others">Others</option>
                            </select>
                            {errors.industry && (
                                <span className="text-[#FF4747] text-sm">
                                    This field is required
                                </span>
                            )}
                        </div>

                        {/* Message Textarea */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="message"
                                className="text-[14px] font-[400] text-[#706E6E]"
                            >
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                placeholder="Type your message"
                                rows={5}
                                className="w-full py-4 px-6 rounded-[20px] bg-[#EFEFEF] text-[#706E6E] placeholder-[#C9C9C9] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('message')}
                            ></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                className="py-3 px-8 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 transition-colors"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!isValid}
                                className={`py-3 px-8 rounded-full flex items-center gap-2 transition-colors ${
                                    isValid
                                        ? 'text-white bg-gray-800 hover:bg-gray-700'
                                        : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                                }`}
                            >
                                Let's Connect
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
