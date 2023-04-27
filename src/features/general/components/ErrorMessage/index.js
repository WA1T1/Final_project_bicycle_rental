import React from 'react';
import PageStructure from "../../../app/PageStructure";
import Thief from '../../../../additional/images/sadThief.jpg'
import classes from './ErrorMessage.module.css'

const ErrorMessage = () => {
    return (
        <PageStructure>
            <div className={classes.container}>
                <img src={Thief} alt={'Вор'}/>
                <div>
                    <h1>Похоже, при выполнении запроса возникла ошибка</h1>
                    <h3>Перезагрузите страницу</h3>
                </div>
            </div>
        </PageStructure>
    );
};

export default ErrorMessage;