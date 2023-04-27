import React, {useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {Auth} from "../../store/actions";

const OnLoader = ({children}) => {
    const dispatch = useDispatch()

    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return;
        }
        if(localStorage.getItem('token')) {
            dispatch(Auth({token: localStorage.getItem('token') }))
        }
    }, [firstRender]);

    return children
};

export default OnLoader;