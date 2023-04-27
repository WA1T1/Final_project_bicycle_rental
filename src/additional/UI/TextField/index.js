import React, {useState} from "react";
import classes from "./TextField.module.css";

const TextField = ({
                   value,
                   type,
                   label,
                   onChange,
                   setRef,
                   error,
                   ...props
               }) => {
    const [focused, setFocused] = useState(false)

    const handleOnFocus = () => {
        setFocused(true)
    }

    const handleOnBlur = () => {
        setFocused(false)
    }

    const renderLabel = () => label && <label className={isFocused ? classes.inputFocused : classes.label}>{ label }</label>

    const isFocused = focused || String(value).length || type === "date"

    return (
        <div className={classes.container}>
            { renderLabel() }
            <input
                className={classes.input}
                value={value}
                type={type}
                onChange={e => onChange(e.target.value)}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                // ref={ref => setRef(ref)}
                {...props}
            />
            <p className={classes.error}>{error}</p>
        </div>
    )
}

export default TextField;