import React from 'react'

export const Input = (props) => {
    const { value, placeholder, placeholderErr, name, className, onChange, isInvalid } = props
    let placeholderText = placeholder
    let customClassName = className
    if (isInvalid) {
        placeholderText = placeholderErr
        customClassName = className + " err-placeholder"
    }
    return (
        <input
            placeholder={placeholderText}
            className={customClassName}
            value={value}
            name={name}
            onChange={onChange} />
    )
}

export const TextArea = (props) => {
    const { value, placeholder, placeholderErr, name, className, onChange, isInvalid } = props
    let placeholderText = placeholder
    let customClassName = className
    if (isInvalid) {
        placeholderText = placeholderErr
        customClassName = className + " err-placeholder"
    }
    return (
        <textarea
            placeholder={placeholderText}
            className={customClassName}
            value={value}
            name={name}
            onChange={onChange} />
    )
}

export const InputBtnGroup = (props) => {
    const { onClick, className, inputClass, buttonClass, buttonTxt, value, name, placeholder, placeholderErr, isInvalid, onChange } = props
    return (
        <div className={className || "category-row add-category-row"}>
            <Input
                className={inputClass || "new-category-input"}
                value={value}
                name={name}
                placeholder={placeholder}
                placeholderErr={placeholderErr}
                isInvalid={isInvalid}
                onChange={onChange}
                type="text" />

            <button onClick={() => { onClick() }}
                className={buttonClass || "add-category-btn"}>
                {buttonTxt}
            </button>
        </div>
    )

}

export default Input