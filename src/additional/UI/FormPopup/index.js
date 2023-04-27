import React, {useEffect, useRef} from 'react';
import classes from "./FormPopup.module.css";
import Button from "../Button";
const FormPopup = ({visible, setVisible, renderItem, header, buttonText, onClick}) => {

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(e) {
                if (ref.current && !ref.current.contains(e.target)) {
                    setVisible(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {

                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    if(visible) {
        return (
            <div>
                <div className={classes.popup}>
                    <div ref={wrapperRef} className={classes.popup_content}>
                        <h2 className={classes.headerText}>{header}</h2>
                        <div className={classes.container}>
                            {renderItem()}
                        </div>
                        <Button onClick={onClick} style={classes.button} text={buttonText}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default FormPopup;