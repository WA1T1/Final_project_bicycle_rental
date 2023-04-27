import React, {useCallback, useMemo} from 'react';
import classes from "./StaffListItem.module.css";
import Profile from '../../../../additional/images/profile.jpg'
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import Button from "../../../../additional/UI/Button";
import {DeleteOfficerRequest} from "../../../../additional/requests/Requests";

const StaffListItem = ({id, name, surname, email, approved}) => {
    const infoString = useMemo(()=> `${email} • ${approved ? 'Одобрен' : 'Не одобрен'}`, [email, approved])
    const dispatch = useDispatch()
    const clickDelete = useCallback(()=> {
        dispatch(DeleteOfficerRequest({id}))
    },[id])

    return (
        <div className={classes.container}>
            <div className={classes.image}>
                <img className={classes.circleImage} src={Profile} alt={'image'}/>
            </div>
            <div className={classes.name}>
                <Link className={classes.links} to={`/staffDetail/${id}`}><h1 className={classes.text}>{`${surname} ${name}`}</h1></Link>
            </div>
            <div className={classes.info}>
                <h3 className={classes.text}>{infoString}</h3>
            </div>
            <div className={classes.buttons}>
                <Button text={'Удалить'} onClick={clickDelete} style={classes.button}/>
            </div>
        </div>
    );
};

export default StaffListItem;