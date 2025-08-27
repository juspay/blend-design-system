'use client'

import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormField } from './FormField'

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

    const industryOptions = [
        { value: 'ePharma', label: 'E-pharma' },
        { value: 'investments', label: 'Investments' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'travel', label: 'Travel' },
        { value: 'eCommerce', label: 'eCommerce' },
        { value: 'insurance', label: 'Insurance' },
        { value: 'telecom_d2h', label: 'Telecom / D2H' },
        { value: 'education', label: 'Education' },
        { value: 'subscription', label: 'Subscription' },
        { value: 'classified', label: 'Classified' },
        { value: 'fintech', label: 'Fintech' },
        { value: 'grocery_delivery', label: 'Grocery Delivery' },
        { value: 'lending_repayment', label: 'Lending/Repayment' },
        { value: 'billpay', label: 'Billpay' },
        { value: 'ticket_booking', label: 'Ticket Booking' },
        { value: 'food_delivery', label: 'Food Delivery' },
        { value: 'others', label: 'Others' },
    ]

    // Prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    // This function will be called on successful form submission
    const onSubmit: SubmitHandler<FormInputs> = () => {
        onClose() // Close the modal after submission
    }

    return (
        // The overlay to dim the background and handle clicks
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-[95vw] max-w-[1200px] lg:w-[80vw] md:w-[85vw] sm:w-[90vw] flex md:flex-row flex-col lg:rounded-[50px] md:rounded-[40px] sm:rounded-[30px] rounded-[20px] lg:p-8 md:p-6 sm:p-4 p-2 xl:gap-24 md:gap-14 sm:gap-6 gap-3 max-h-[90vh] overflow-hidden"
                style={{
                    background:
                        'linear-gradient(0deg, #0E0E0E 0%, #0E0E0E 100%), linear-gradient(180deg, #101010 0%, #FFF 100%), #FFF',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="lg:py-6 md:py-4 py-2 xl:gap-7 lg:gap-6 md:gap-5 gap-4 flex flex-col justify-between w-full">
                    <div className="flex flex-col xl:gap-4 lg:gap-3 md:gap-2 gap-1">
                        <p className="text-[#9E9E9E] 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-normal">
                            We're always listening.
                        </p>
                        <p className="text-[#4F4F4F] font-light 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-sm text-xs ">
                            Whether it’s feedback, a bug, or a bright idea —
                            let’s make this system better together.
                        </p>
                    </div>
                    <div className="flex flex-col text-[#9F9F9F] 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-sm text-xs ">
                        <p>Email Us</p>
                        <p>designsystem@company.com</p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" w-full overflow-y-auto relative bg-white lg:py-4 md:py-2 py-1 xl:max-h-[80vh] max-h-[40vh] lg:rounded-[50px] md:rounded-[40px] sm:rounded-[30px] rounded-[20px] "
                >
                    <div className="lg:p-10 md:p-8 sm:p-6 p-4 flex flex-col 2xl:gap-6 xl:gap-5 lg:gap-4 md:gap-3 sm:gap-2 gap-1 overflow-y-auto">
                        {/* Full Name Input */}
                        <FormField
                            label="Your Full Name"
                            id="fullName"
                            type="text"
                            required={true}
                            error={errors.fullName}
                            register={register('fullName', { required: true })}
                            className="xl:py-4 xl:px-6"
                        />

                        {/* Email Input */}
                        <FormField
                            label="Your Email ID"
                            id="email"
                            type="email"
                            required={true}
                            error={errors.email}
                            register={register('email', {
                                required: true,
                                pattern: /^\S+@\S+$/i,
                            })}
                        />

                        {/* Contact Number Input */}
                        <FormField
                            label="Your Contact Number"
                            id="contactNumber"
                            type="tel"
                            required={true}
                            error={errors.contactNumber}
                            register={register('contactNumber', {
                                required: true,
                            })}
                            prefix="+91"
                        />

                        {/* Industry Dropdown */}
                        <FormField
                            label="Your Industry"
                            id="industry"
                            type="select"
                            required={true}
                            error={errors.industry}
                            register={register('industry', { required: true })}
                            options={industryOptions}
                            placeholder="Your Industry"
                        />

                        {/* Message Textarea */}
                        <FormField
                            label="Your Message"
                            id="message"
                            type="textarea"
                            placeholder="Type your message"
                            rows={3}
                            error={errors.message}
                            register={register('message')}
                        />
                    </div>

                    {/* Buttons */}
                    <div className=" sticky -bottom-[1vh]  bg-white py-2">
                        <div className="flex flex-row justify-end px-10 gap-3 sm:gap-4 py-2 ">
                            <button
                                type="button"
                                className="w-fit py-1 sm:px-4 px-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 transition-colors bg-white text-xs lg:text-sm"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!isValid}
                                className={`w-fit py-1 sm:px-4 px-2 whitespace-nowrap rounded-full flex items-center justify-center lg:gap-2  transition-colors  text-xs lg:text-sm ${
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
                    </div>
                </form>
            </div>
        </div>
    )
}
