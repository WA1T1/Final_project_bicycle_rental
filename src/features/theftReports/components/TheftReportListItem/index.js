import React, {useCallback, useMemo} from 'react';
import classes from './TheftReportListItem.module.css';
import Circle from '../../../../additional/images/bycicleCircle.png'
import moment from "moment";
import Button from "../../../../additional/UI/Button";
import {useDispatch} from "react-redux";
import {DeleteCase} from "../../../../additional/store/actions";
import {Link} from "react-router-dom";

const TheftReportListItem = ({id, description, date, name, type, color}) => {
    const infoString = useMemo(()=> `${name} • ${type === 'general' ? 'Обычный' : 'Спортивный'} • ${color} • ${moment(date).format('ll')}`, [date, name, type, color])
    const dispatch = useDispatch()
    const clickDelete = useCallback(()=> {
        dispatch(DeleteCase({id}))
    },[id])

    return (
        <div className={classes.container}>
            <div className={classes.image}>
                <img className={classes.circleImage} src={Circle} alt={'image'}/>
            </div>
            <div className={classes.description}>
                <Link className={classes.links} to={`/thiefReportDetail/${id}`}><h1 className={classes.text}>{description}</h1></Link>
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

export default TheftReportListItem;