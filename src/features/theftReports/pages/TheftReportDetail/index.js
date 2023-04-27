import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PageStructure from "../../../app/PageStructure";
import {useParams} from "react-router-dom";
import * as yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {EditCase, GetAllOfficers, GetOneCase} from "../../../../additional/store/actions";
import {caseSelector, caseStateSelector, officerListSelector} from "../../../../additional/store/selectors";
import {useLoader} from "../../../../additional/hooks/LoaderFolder/useLoader";
import ErrorMessage from "../../../general/components/ErrorMessage";
import classes from "./TheftReportDetail.module.css";
import Thief from '../../../../additional/images/stepThief.jpg'
import moment from "moment";
import Button from "../../../../additional/UI/Button";
import FormPopup from "../../../../additional/UI/FormPopup";
import {useFormik} from "formik";
import TextField from "../../../../additional/UI/TextField";
import SelectableList from "../../../../additional/UI/SelectableList";

const statusEnum = {
    new: 'Новая',
    in_progress: 'В процессе',
    done: 'Завершена'
}

const TheftReportDetail = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const loader = useLoader()
    const [popupVisible, setPopupVisible] = useState(false)

    const reportDetail = useSelector(state=> caseSelector(state, {id}))
    const reportDetailState = useSelector(state=> caseStateSelector(state, {id}))
    const officerList = useSelector(officerListSelector)

    useEffect(()=>{
        dispatch(GetOneCase({id}))
        dispatch(GetAllOfficers({}))
    },[])

    const validationSchema = yup.object({
        resolution: yup.string()
            .test('resolution', 'Обязательное поле', (value)=>{
                return formik.values.status === 'done' && !!value
            }).notRequired(),
    })

    const formik = useFormik({
        initialValues: {
            id: id,
            status: reportDetail.status,
            licenseNumber: reportDetail.licenseNumber,
            ownerFullName: reportDetail.ownerFullName,
            type: reportDetail.type,
            color: reportDetail.color,
            date: reportDetail.date,
            officer: reportDetail.officer,
            description: reportDetail.description,
            resolution: reportDetail.resolution
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit: () => {
            dispatch(EditCase({...formik.values}))
            setPopupVisible(false)
        }
    })

    useEffect(()=>{
        if (!reportDetailState.isFetching) {
            formik.setValues({
                id: id,
                status: reportDetail.status,
                licenseNumber: reportDetail.licenseNumber,
                ownerFullName: reportDetail.ownerFullName,
                type: reportDetail.type,
                color: reportDetail.color,
                date: reportDetail.date,
                officer: reportDetail.officer,
                description: reportDetail.description,
                resolution: reportDetail.resolution
            })
        }
    },[reportDetail])

    useEffect(()=>{
        if (formik.values.status !== 'done') {
            formik.setFieldValue('resolution', '')
        }
    },[formik.values.status])

    const renderEditForm = useCallback(()=>{
        const officers = officerList.filter(officer => officer.approved).map(officer => {return {key: officer._id, value: officer.lastName + ' ' + officer.firstName}})
        return (<>
            <SelectableList onChange={({target})=> formik.setFieldValue('status', target.value)} defaultValue={formik.values.status} label={"Статус"} data={[{key: 'new', value: 'Новая'}, {key: 'in_progress', value: 'В процессе'}, {key: 'done', value: 'Завершена'}]}/>
            {!!officers.length && <SelectableList onChange={({target})=> formik.setFieldValue('officer', target.value)} defaultValue={formik.values.officer ?? '-non'} label={"Сотрудник"} data={officers}/>}
            <SelectableList onChange={({target})=> formik.setFieldValue('type', target.value)} defaultValue={formik.values.type} label={"Тип"} data={[{key: 'general', value:'Обычный'}, {key: 'sport', value:'Спортивный'}]}/>
            <TextField onChange={(value) => formik.setFieldValue('ownerFullName', value)} label={'Имя клиента'} value={formik.values.ownerFullName}/>
            <TextField onChange={(value) => formik.setFieldValue('licenseNumber', value)} label={'Номер лицензии'} value={formik.values.licenseNumber}/>
            <TextField onChange={(value) => formik.setFieldValue('color', value)} label={'Цвет'} value={formik.values.color}/>
            <TextField onChange={(value) => formik.setFieldValue('description', value)} label={'Описание'} value={formik.values.description}/>
            <TextField onChange={(value) => formik.setFieldValue('date', value)} label={''} type={'date'} value={formik.values.date}/>
            {formik.values.status === 'done' && <TextField error={formik.errors.resolution}  onChange={(value) => formik.setFieldValue('resolution', value)} label={'Завершающий комментарий'} value={formik.values.resolution}/>}
        </>)
    },[formik.values, formik.errors])

    const userName = useMemo(()=> officerList.filter(oficer => oficer._id === formik.values.officer).length ? officerList.filter(oficer => oficer._id === formik.values.officer)[0].firstName : null, [officerList, formik.values])

    const firstRender = useRef(true)
    useEffect(()=>{
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        if(reportDetailState.isFetching) {
            loader.start()
        }
        else {
            loader.stop();
        }
    },[reportDetailState])

    const EditButtonClick = useCallback(()=>{
        setPopupVisible(true)
        formik.setValues({
            id: id,
            status: reportDetail.status,
            licenseNumber: reportDetail.licenseNumber,
            ownerFullName: reportDetail.ownerFullName,
            type: reportDetail.type,
            color: reportDetail.color,
            date: reportDetail.date,
            officer: reportDetail.officer,
            description: reportDetail.description,
            resolution: reportDetail.status === 'done' ? reportDetail.resolution : ''
        })
    },[formik, reportDetail, id])

    const firstRegistrationRender = useRef(true)
    useEffect(()=>{
        if (firstRegistrationRender.current) {
            firstRegistrationRender.current = false
            return
        }
        if(reportDetailState.isFetching) {
            loader.start()
        }
        else {
            loader.stop();
            setPopupVisible(false)
        }
    },[reportDetailState, loader])

    if (reportDetailState.isError) {
        return <ErrorMessage/>
    }

    return (
        <PageStructure>
            <h2 className={classes.header}>Сообщение о краже №{reportDetail._id}</h2>
            <div className={classes.container}>
                <div className={classes.leftSide}>
                    <img className={classes.image} src={Thief} alt={'Вор'}/>
                    <Button onClick={EditButtonClick} style={classes.button} text={'Редактирование'}/>
                </div>
                <div className={classes.rightSide}>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Цвет</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{reportDetail.color ?? 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Имя клиента</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{reportDetail.ownerFullName ?? 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Описание</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{reportDetail.description ?? 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Номер лицензии</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{reportDetail.licenseNumber ?? 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Сотрудник</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{userName ?? 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Завершающий комментарий</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{reportDetail.resolution ?? 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Статус</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{statusEnum[reportDetail.status] ?? 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Тип велосипеда</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{reportDetail.type === 'general' ? 'Обычный' : 'Спортивный'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Дата кражи</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{reportDetail.date ? moment(reportDetail.date).format('ll') : 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Заявка создана</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{moment(reportDetail.createdAt).format('ll')}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Заявка отредактирована</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{reportDetail.updatedAt ? moment(reportDetail.updatedAt).format('ll') : 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Номер заявки</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{reportDetail._id}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>Версия</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{reportDetail.__v ?? 'Нет'}</p>
                        </div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.cell}>
                            <p>ID клиента</p>
                        </div>
                        <div className={classes.cell}>
                            <p>{reportDetail.clientId ?? 'Нет'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <FormPopup onClick={()=>{formik.handleSubmit()}} buttonText={'Редактирование'} header={'Форма редактирования'} visible={popupVisible} setVisible={()=>setPopupVisible()} renderItem={renderEditForm}/>
        </PageStructure>
    );
};

export default TheftReportDetail;