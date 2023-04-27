import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GetOfficer, UpdateOfficer} from "../../../../additional/store/actions";
import PageStructure from "../../../app/PageStructure";
import {officerSelector, officerStateSelector} from "../../../../additional/store/selectors";
import classes from "./StaffDetail.module.css";
import Profile from "../../../../additional/images/profile.jpg";
import Button from "../../../../additional/UI/Button";
import ErrorMessage from "../../../general/components/ErrorMessage";
import TextField from "../../../../additional/UI/TextField";
import {useFormik} from "formik";
import FormPopup from "../../../../additional/UI/FormPopup";
import {useLoader} from "../../../../additional/hooks/LoaderFolder/useLoader";

const StaffDetail = () => {
    const dispatch = useDispatch()
    const loader = useLoader()
    const {id} = useParams()
    const [popupVisible, setPopupVisible] = useState(false)

    const officer = useSelector(state => officerSelector(state, {id}))
    const officerState = useSelector(state => officerStateSelector(state, {id}))

    const formik = useFormik({
        initialValues: {
            id: id,
            password: '',
            firstName: officer.firstName,
            lastName: officer.lastName,
            approved: officer.approved,
        },
        onSubmit: () => {
            let updateUserData = {
                id,
                firstName: formik.values.firstName,
                lastName: formik.values.lastName,
                approved: formik.values.approved,
            };
            if (formik.values.password) {
                updateUserData['password'] = formik.values.password
            }
            dispatch(UpdateOfficer({...updateUserData}))
            setPopupVisible(false)
        }
    })

    useEffect(()=>{
        if (!officerState.isFetching) {
            formik.setValues({
                id: id,
                password: '',
                firstName: officer.firstName,
                lastName: officer.lastName,
                approved: officer.approved,
            })
        }
    },[officerState])

    const renderEditForm = useCallback(()=>{
        return (<>
            <TextField onChange={(value) => formik.setFieldValue('password', value)} type={'password'} label={'Пароль'} value={formik.values.password}/>
            <TextField onChange={(value) => formik.setFieldValue('firstName', value)} label={'Имя'} value={formik.values.firstName}/>
            <TextField onChange={(value) => formik.setFieldValue('lastName', value)} label={'Фамилия'} value={formik.values.lastName}/>
            <div className={classes.checkboxContainer}>
                <h2>Подтверждён</h2>
                <input className={classes.checkbox} onChange={() => formik.setFieldValue('approved', !formik.values.approved)} checked={formik.values.approved} type="checkbox"/>
            </div>
            </>)
    },[formik.values, formik.errors])

    useEffect(()=>{
        dispatch(GetOfficer({id}))
    },[])

    const firstRender = useRef(true)
    useEffect(()=>{
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        if(officerState.isFetching) {
            loader.start()
        }
        else {
            loader.stop();
        }
    },[officerState, loader])

    const EditButtonClick = useCallback(()=>{
        formik.setValues({
            id: id,
            password: '',
            firstName: officer.firstName,
            lastName: officer.lastName,
            approved: officer.approved,
        })
        setPopupVisible(true)
    },[formik, officer])

    if (officerState.isError) {
        return <ErrorMessage/>
    }

    return (
        <PageStructure>
            <h2 className={classes.header}>Информация о сотруднике {officer.firstName}</h2>
            <div className={classes.container}>
                <div className={classes.leftSide}>
                    <img className={classes.image} src={Profile} alt={'Сотрудник'}/>
                    <Button onClick={EditButtonClick} style={classes.button} text={'Редактирование'}/>
                </div>
                <div className={classes.rightSide}>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Одобрен</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{officer.approved ? 'Да' : 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Имя</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{officer.firstName ?? 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Фамилия</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{officer.lastName ?? 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Email</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{officer.email ?? 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>ID клиента</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{officer.clientId ?? 'Нет'}</p>
                        </div>
                    </div>

                </div>
            </div>
            <FormPopup onClick={()=>{formik.handleSubmit()}} buttonText={'Редактирование'} header={'Форма редактирования'} visible={popupVisible} setVisible={()=>setPopupVisible()} renderItem={renderEditForm}/>
        </PageStructure>
    );
};

export default StaffDetail;