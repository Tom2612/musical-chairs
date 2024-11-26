import React from 'react'
import { twMerge } from "tailwind-merge";


interface TextFieldProps {
    name: string;
    value: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    containerClass?: string;
    inputClass?: string;
    labelClass?: string;
    required?: boolean;
}

export default function TextField({
    name,
    value,
    onChange,
    label,
    placeholder,
    containerClass,
    inputClass,
    labelClass,
    required
}: TextFieldProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === "" ? null : e.target.value;
        onChange({
            target: { name, value: newValue },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className={twMerge(containerClass, "w-full")}>
        <label className={twMerge("text-sm", labelClass)}>
          {label || String(name.charAt(0).toUpperCase() + name.slice(1))}
          {required ?? <span className="text-red-500">*</span>}
        </label>
        <input
          className={twMerge(inputClass)}
          placeholder={placeholder}
          type="text"
          name={name}
          value={value || ""}
          onChange={handleChange}
        />
      </div>
    );
}
