import React from 'react';
import classes from "./Button.module.css";

const Button = ({ onClick, text, style }) => {
    return <button className={[classes.button, style].join(' ')} type={'submit'} onClick={onClick}>{text}</button>;
};

export default Button;