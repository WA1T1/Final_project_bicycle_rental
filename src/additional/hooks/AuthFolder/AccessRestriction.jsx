import React from 'react';
import {Navigate} from "react-router-dom";
import {userSelector} from "../../store/selectors";
import {useSelector} from "react-redux";


const AccessRestriction = ({children}) => {
    const user = useSelector(userSelector)

    if(!user?.email){
        return <Navigate to="/"/>
    }

    return children
};

export default AccessRestriction;