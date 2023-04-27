import React from 'react';
import PageStructure from "../../../app/PageStructure";
import Thief from '../../../../additional/images/thiefMain.jpg'
import classes from './Home.module.css'

const Home = () => {
    return (
        <PageStructure>
            <div className={classes.container}>
                <div className={classes.text}>
                    <p className={classes.mainHeader}>Пропал велосипед?</p>
                    <p className={classes.subHeader}>Сообщите нам!</p>
                </div>
                <img src={Thief} alt={'Вор'}/>
            </div>
        </PageStructure>
    );
};

export default Home;