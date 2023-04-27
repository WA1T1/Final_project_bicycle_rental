import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as yup from 'yup';
import classes from "./Header.module.css";
import Logo from '../../../../additional/images/Logo.jpg'
import FormPopup from "../../../../additional/UI/FormPopup";
import {Link} from "react-router-dom";
import TextField from "../../../../additional/UI/TextField";
import {useFormik} from "formik";
import {
    CreateCase, CreateCasePublic,
    GetAllOfficers,
    signIn,
    signUp,
    unlogin
} from "../../../../additional/store/actions";
import {useDispatch, useSelector} from "react-redux";
import {useLoader} from "../../../../additional/hooks/LoaderFolder/useLoader";
import {officerListSelector, userSelector} from "../../../../additional/store/selectors";
import SelectableList from "../../../../additional/UI/SelectableList";

const Header = () => {
    const dispatch = useDispatch();
    const loader = useLoader()
    const [popupVisible, setPopupVisible] = useState(false);
    const [formType, setFormType] = useState('signUp');

    const registrationState = useSelector(state => state.signUpState);
    const authorizationState = useSelector(state => state.signUpState);

    const officerList = useSelector(officerListSelector)
    const user = useSelector(userSelector);



    const validationSchema = yup.object({
        licenseNumber: yup.string().test('client', 'Это обязательное поле', (value)=> {
            return !!value
        }),
        ownerFullName: yup.string().test('client', 'Это обязательное поле', (value)=> {
            return !!value
        }),
        type: yup.string().test('client', 'Это обязательное поле', (value)=> {
            return !!value
        }),
        clientId: yup.string().test('client', 'Это обязательное поле', (value)=> {
            return Object.keys(user).length && !!value
        }),
    })

    const getValidationSchema = useCallback(()=>{
        switch (formType) {
            case 'signIn':
                return yup.object({})
            case 'signUp':
                return yup.object({})
            case 'theftReport':
                return validationSchema
            default:
                return yup.object({})
        }
    },[formType, validationSchema])

    const formik = useFormik({
        initialValues: {
            mail: '',
            password: '',
            name: '',
            surname: '',
            clientID: '',

            authMail: '',
            authPassword: '',

            licenseNumber: '',
            ownerFullName: '',
            type: 'general',
            color: '',
            date: '',
            officer: '',
            description: ''
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: getValidationSchema(),
        onSubmit: () => {
            renderPopupContent().onClick()
        },
    })

    const renderPopupContent = useCallback(()=>{
        switch (formType) {
            case 'signIn':
                return {
                    header: 'Форма авторизации',
                    buttonText: 'Авторизоваться',
                    onClick: authorizationButtonClick,
                    renderItem: renderLoginForm,
                    validationSchema: yup.object({})
                }
            case 'signUp':
                return {
                    header: 'Форма авторизации',
                    buttonText: 'Авторизоваться',
                    onClick: registrationButtonClick,
                    renderItem: renderRegistrationForm,
                    validationSchema: yup.object({})
                }
            case 'theftReport':
                return {
                    header: 'Форма сообщения о краже',
                    buttonText: 'Сообщить',
                    onClick: reportButtonClick,
                    renderItem: renderReportForm,
                    validationSchema: validationSchema
                }
            default:
                return {
                    header: 'Форма авторизации',
                    buttonText: 'Авторизоваться',
                    onClick: authorizationButtonClick,
                    renderItem: renderLoginForm,
                    validationSchema: yup.object({})
                }
        }
    },[formType, formik])

    useEffect(()=>{
        dispatch(GetAllOfficers({}))
    },[])

    const renderLoginForm = useCallback(()=>{
        return (<>
            <TextField onChange={(value) => formik.setFieldValue('authMail', value)} label={'Email'} value={formik.values.authMail}/>
            <TextField onChange={(value) => formik.setFieldValue('authPassword', value)} label={'Пароль'} type={'password'} value={formik.values.authPassword}/>
        </>)
    },[formik.values])

    const renderRegistrationForm = useCallback(()=>{
        return (<>
            <TextField onChange={(value) => formik.setFieldValue('mail', value)} label={'Email'} value={formik.values.mail}/>
            <TextField onChange={(value) => formik.setFieldValue('password', value)} label={'Пароль'} type={'password'} value={formik.values.password}/>
            <TextField onChange={(value) => formik.setFieldValue('name', value)} label={'Имя'} value={formik.values.name}/>
            <TextField onChange={(value) => formik.setFieldValue('surname', value)} label={'Фамилия'} value={formik.values.surname}/>
            <TextField onChange={(value) => formik.setFieldValue('clientID', value)} label={'Клиент ID'} value={formik.values.clientID}/>
        </>)
    },[formik.values])

    const renderReportForm = useCallback(()=>{
        const officers = officerList.filter(officer => officer.approved).map(officer => {return {key: officer._id, value: officer.lastName + ' ' + officer.firstName}})
        return (<>
            <TextField onChange={(value) => formik.setFieldValue('licenseNumber', value)} error={formik.errors.licenseNumber} label={'Номер лицензии'} value={formik.values.licenseNumber}/>
            <TextField onChange={(value) => formik.setFieldValue('ownerFullName', value)} label={'Имя клиента'} error={formik.errors.ownerFullName} value={formik.values.ownerFullName}/>
            <SelectableList onChange={({target})=> formik.setFieldValue('type', target.value)} defaultValue={formik.values.type} error={formik.errors.type} label={"Тип"} data={[{key: 'general', value:'Обычный'}, {key: 'sport', value:'Спортивный'}]}/>
            <TextField onChange={(value) => formik.setFieldValue('color', value)} label={'Цвет'} value={formik.values.color}/>
            {!!Object.keys(user).length && <TextField onChange={(value) => formik.setFieldValue('clientId', value)} error={formik.errors.clientId} label={'ID клиента'} value={formik.values.clientId}/>}
            <TextField onChange={(value) => formik.setFieldValue('date', value)} label={'Дата кражи'} type={'date'} value={formik.values.date}/>
            {!!officers.length && <SelectableList onChange={({target}) => formik.setFieldValue('officer', target.value)} label={'Сотрудник'} defaultValue={user._id} data={officers}/>}
            <TextField onChange={(value) => formik.setFieldValue('description', value)} label={'Описание'} value={formik.values.description}/>
        </>)
    },[formik.values, formik.errors, user, officerList])

    function FormButtonClick(type) {
        setFormType(type);
        setPopupVisible(true)
    }

    const firstRegistrationRender = useRef(true)
    useEffect(()=>{
        if (firstRegistrationRender.current) {
            firstRegistrationRender.current = false
            return
        }
        if(registrationState.isFetching) {
            loader.start()
        }
        else {
            loader.stop();
            setPopupVisible(false)
        }
    },[registrationState, loader])

    const firstAuthorizationRender = useRef(true)
    useEffect(()=>{
        if (firstAuthorizationRender.current) {
            firstAuthorizationRender.current = false
            return
        }
        if(authorizationState.isFetching) {
            loader.start()
        }
        else {
            loader.stop();
            setPopupVisible(false)
        }
    },[authorizationState, loader])

    const registrationButtonClick = useCallback(()=>{
        dispatch(signUp({email: formik.values.mail, password: formik.values.password, clientId: formik.values.clientID, firstName: formik.values.name, lastName: formik.values.surname}))
    },[formik.values])

    const authorizationButtonClick = useCallback(()=>{
        dispatch(signIn({email: formik.values.authMail, password: formik.values.authPassword}))
    },[formik.values])

    const reportButtonClick = useCallback(()=>{
        if(Object.keys(user).length) {
            dispatch(CreateCase({...formik.values}))
        }
        else {
            dispatch(CreateCasePublic({...formik.values}))
        }
    },[formik.values])

    const unloginClick = useCallback(()=>{
        localStorage.removeItem('token')
        dispatch(unlogin())
    },[])

    return (
        <div className={classes.mainHeaderContainer}>
            <div className={classes.logoRow}>
                <Link className={classes.links} to={'/'}><img className={classes.logoImg} src={Logo} alt="logo"/></Link>
                <div className={classes.centerLogo}>
                    <h1>Велопрокат</h1>
                    <div> </div>
                    <h3>Сообщения о пропаже</h3>
                </div>
                <div>
                    {!user?.email &&
                        <h4>
                            <span onClick={() => FormButtonClick('signIn')}>Войти</span>  /  <span onClick={() => FormButtonClick('signUp')}>Зарегистрироваться</span>
                        </h4>
                    }
                    {user?.email &&
                        <h4>
                            <span onClick={unloginClick}>Выйти</span>
                        </h4>
                    }
                </div>
            </div>
            <div className={classes.navList}>
                <h3 onClick={()=>FormButtonClick('theftReport')}>Сообщить о краже</h3>
                {!!user?.email && <Link className={classes.links} to={'/theftReportList'}><h3>Сообщения о краже</h3></Link>}
                {!!user?.email && <Link className={classes.links} to={'/staffList'}><h3>Список сотрудников</h3></Link>}
            </div>
            <FormPopup onClick={()=>{
                formik.handleSubmit()}
            } buttonText={renderPopupContent().buttonText} header={renderPopupContent().header} visible={popupVisible} setVisible={()=>setPopupVisible()} renderItem={renderPopupContent().renderItem}/>
        </div>
    );
};

export default Header;