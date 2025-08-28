'use client'

import React from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface Option {
    value: string
    label: string
}

interface FormFieldProps {
    label: string
    id: string
    type?: 'text' | 'email' | 'tel' | 'select' | 'textarea'
    required?: boolean
    placeholder?: string
    rows?: number
    options?: Option[]
    error?: FieldError
    register: UseFormRegisterReturn
    prefix?: string
    className?: string
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    id,
    type = 'text',
    required = false,
    placeholder,
    rows = 3,
    options = [],
    error,
    register,
    prefix,
    className = '',
}) => {
    const baseInputClasses = `w-full 2xl:py-4 xl:py-3 py-2 2xl:px-6 xl:px-4 lg:px-3 px-2 rounded-[20px] bg-[#EFEFEF] text-[#706E6E] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs md:text-sm ${className}`

    const renderInput = () => {
        switch (type) {
            case 'select':
                return (
                    <select
                        id={id}
                        defaultValue=""
                        className={`${baseInputClasses} appearance-none text-xs md:text-sm text-[#706E6E]`}
                        {...register}
                    >
                        <option value="" disabled className="text-[#706E6E]">
                            {' '}
                            -
                        </option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )
            case 'textarea':
                return (
                    <textarea
                        id={id}
                        placeholder={placeholder}
                        rows={rows}
                        className={`${baseInputClasses} placeholder-[#C9C9C9] sm:rows-4 md:rows-5`}
                        {...register}
                    />
                )
            case 'tel':
                if (prefix) {
                    return (
                        <div className="flex items-center lg:gap-2 gap-1 w-full bg-[#EFEFEF] rounded-[20px] 2xl:px-6 xl:px-4 lg:px-3 px-2">
                            <span className="text-[#706E6E] text-xs md:text-sm">
                                {prefix}
                            </span>
                            <input
                                type={type}
                                id={id}
                                placeholder={placeholder}
                                className="flex-1 2xl:py-4 xl:py-3 py-2 bg-transparent text-[#706E6E] placeholder-gray-500 focus:outline-none text-xs md:text-sm"
                                {...register}
                            />
                        </div>
                    )
                }
            // Fall through to default input if no prefix
            default:
                return (
                    <input
                        type={type}
                        id={id}
                        placeholder={placeholder}
                        className={baseInputClasses}
                        {...register}
                    />
                )
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className="text-xs md:text-sm font-[400] text-[#706E6E]"
            >
                {label}
                {required && <span className="text-[#FF4747]">*</span>}
            </label>
            {renderInput()}
            {error && (
                <span className="text-[#FF4747] text-xs md:text-sm">
                    {error.type === 'required'
                        ? 'This field is required'
                        : error.type === 'pattern'
                          ? 'Valid email is required'
                          : error.message || 'This field is required'}
                </span>
            )}
        </div>
    )
}
