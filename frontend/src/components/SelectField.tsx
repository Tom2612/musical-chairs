import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SelectFieldProps {
    name: string
    options: Array<{ label: string, value: string | null }>
    value: string | null
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    label?: string
    labelClass?: string
    required?: boolean
    placeholder?: string
    nullValue?: boolean
    containerClass?: string
    inputClass?: string
}

export default function SelectField({
    name,
    options,
    value,
    onChange,
    label,
    labelClass,
    required,
    placeholder = 'Select an option',
    nullValue,
    containerClass = '',
    inputClass = '',
}: SelectFieldProps) {
    
    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e)
    }

    return (
      <div className={twMerge(containerClass)}>
            <label className={twMerge('text-sm', labelClass)}>
                {label || String(name.charAt(0).toUpperCase() + name.slice(1))}
                {required ?? <span className="text-red-500">*</span>}
            </label>
            <select
                name={name}
                value={value || ""}
                onChange={handleChange}
                className={twMerge('block', inputClass)}
            >
                {nullValue && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value as string}>
                        {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
                    </option>
                ))}
            </select>
      </div>
    );
}