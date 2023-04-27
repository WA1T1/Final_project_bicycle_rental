import {all, call, takeLatest, put, race, take, select} from "redux-saga/effects";
import {
    ACTIONS,
    AuthError,
    AuthSuccess,
    CreateCaseError,
    CreateCasePublicError,
    CreateCasePublicSuccess,
    CreateCaseSuccess,
    CreateOfficerError,
    CreateOfficerSuccess,
    DeleteCaseError,
    DeleteCaseSuccess,
    DeleteOfficerError,
    DeleteOfficerSuccess,
    EditCaseError,
    EditCaseSuccess, GetAllCases,
    GetAllCasesError,
    GetAllCasesSuccess, GetAllOfficers,
    GetAllOfficersError,
    GetAllOfficersSuccess, GetOfficer, GetOfficerError,
    GetOfficerSuccess, GetOneCase,
    GetOneCaseError,
    GetOneCaseSuccess, signIn,
    signInError,
    signInSuccess,
    signUpError,
    signUpSuccess,
    UpdateOfficerError,
    UpdateOfficerSuccess
} from "./actions";
import {
    AuthRequest,
    CreateCasePublicRequest,
    CreateCaseRequest,
    CreateOfficerRequest,
    DeleteCaseRequest,
    DeleteOfficerRequest,
    EditCaseRequest,
    GetAllCasesRequest, GetAllOfficersRequest, GetOfficerRequest,
    GetOneCaseRequest,
    SignInRequest,
    SignUpRequest,
    UpdateOfficerRequest
} from "../requests/Requests";

function* signUpWorker({payload}) {
    try {
        const result = yield call(SignUpRequest, payload)
        yield put(signIn({email: payload.email, password: payload.password }))
        const { error } = yield race({
            success: take(ACTIONS.SIGN_IN_SUCCESS),
            error: take(ACTIONS.SIGN_IN_ERROR)
        })
        if (error) {
            throw new Error();
        }
        yield put(signUpSuccess({result, ...payload}))
    } catch (err){
        yield put(signUpError({ err,...payload}))
    }
}

function* signUpWatcher() {
    yield takeLatest(ACTIONS.SIGN_UP, signUpWorker)
}

function* SignInWorker({payload}) {
    try {
        const result = yield call(SignInRequest, payload)
        localStorage.setItem('token', result.token)
        yield put(signInSuccess({result, ...payload}))
    } catch {
        yield put(signInError(payload))
    }
}

function* SignInWatcher() {
    yield takeLatest(ACTIONS.SIGN_IN, SignInWorker)
}

function* AuthWorker({payload}) {
    try {
        const result = yield call(AuthRequest, payload)
        yield put(AuthSuccess({result, ...payload}))
    } catch {
        yield put(AuthError(payload))
    }
}

function* AuthWatcher() {
    yield takeLatest(ACTIONS.AUTH, AuthWorker)
}

function* CreateCaseWorker({payload}) {
    try {
        const result = yield call(CreateCaseRequest, payload)
        yield put(GetAllCases({}))
        yield put(CreateCaseSuccess({result, ...payload}))
    } catch {
        yield put(CreateCaseError(payload))
    }
}

function* CreateCaseWatcher() {
    yield takeLatest(ACTIONS.CREATE_CASE, CreateCaseWorker)
}

function* CreateCasePublicWorker({payload}) {
    try {
        const result = yield call(CreateCasePublicRequest, payload)
        yield put(CreateCasePublicSuccess({result, ...payload}))
    } catch {
        yield put(CreateCasePublicError(payload))
    }
}

function* CreateCasePublicWatcher() {
    yield takeLatest(ACTIONS.CREATE_CASE_PUBLIC, CreateCasePublicWorker)
}

function* EditCaseWorker({payload}) {
    try {
        const result = yield call(EditCaseRequest, payload)
        yield put(GetOneCase({id: payload.id}))
        yield put(EditCaseSuccess({result, ...payload}))
    } catch {
        yield put(EditCaseError(payload))
    }
}

function* EditCaseWatcher() {
    yield takeLatest(ACTIONS.EDIT_CASE, EditCaseWorker)
}

function* DeleteCaseWorker({payload}) {
    try {
        const result = yield call(DeleteCaseRequest, payload)
        yield put(GetAllCases({}))
        yield put(DeleteCaseSuccess({result, ...payload}))
    } catch {
        yield put(DeleteCaseError(payload))
    }
}

function* DeleteCaseWatcher() {
    yield takeLatest(ACTIONS.DELETE_CASE, DeleteCaseWorker)
}

function* GetAllCasesWorker({payload}) {
    const authState = yield select(state => state.AuthState)
    try {
        if(!Object.keys(authState).length) {
            yield race({
                success: take(ACTIONS.AUTH),
                error: take(ACTIONS.SIGN_IN)
            })
        }
        if (authState.isFetching) {
            const { error } = yield race({
                success: take(ACTIONS.AUTH_SUCCESS),
                error: take(ACTIONS.AUTH_ERROR)
            })
            if (error) {
                throw new Error();
            }
        }
        const result = yield call(GetAllCasesRequest, payload)
        yield put(GetAllCasesSuccess({result, ...payload}))
    } catch {
        yield put(GetAllCasesError(payload))
    }
}

function* GetAllCasesWatcher() {
    yield takeLatest(ACTIONS.GET_ALL_CASES, GetAllCasesWorker)
}

function* GetOneCaseWorker({payload}) {
    const authState = yield select(state => state.AuthState)
    try {
        if(!Object.keys(authState).length) {
            yield race({
                success: take(ACTIONS.AUTH),
                error: take(ACTIONS.SIGN_IN)
            })
        }
        if (authState.isFetching) {
            const { error } = yield race({
                success: take(ACTIONS.AUTH_SUCCESS),
                error: take(ACTIONS.AUTH_ERROR)
            })
            if (error) {
                throw new Error();
            }
        }
        const result = yield call(GetOneCaseRequest, payload)
        yield put(GetOneCaseSuccess({result, ...payload}))
    } catch {
        yield put(GetOneCaseError(payload))
    }
}

function* GetOneCaseWatcher() {
    yield takeLatest(ACTIONS.GET_ONE_CASE, GetOneCaseWorker)
}

function* CreateOfficerWorker({payload}) {
    try {
        const result = yield call(CreateOfficerRequest, payload)
        yield put(CreateOfficerSuccess({result, ...payload}))
    } catch {
        yield put(CreateOfficerError(payload))
    }
}

function* CreateOfficerWatcher() {
    yield takeLatest(ACTIONS.CREATE_OFFICER, CreateOfficerWorker)
}

function* UpdateOfficerWorker({payload}) {
    try {
        const result = yield call(UpdateOfficerRequest, payload)
        yield put(GetOfficer({id: payload.id}))
        yield put(UpdateOfficerSuccess({result, ...payload}))
    } catch {
        yield put(UpdateOfficerError(payload))
    }
}

function* UpdateOfficerWatcher() {
    yield takeLatest(ACTIONS.UPDATE_OFFICER, UpdateOfficerWorker)
}

function* DeleteOfficerWorker({payload}) {
    try {
        const result = yield call(DeleteOfficerRequest, payload)
        yield put(GetAllOfficers({}))
        yield put(DeleteOfficerSuccess({result, ...payload}))
    } catch {
        yield put(DeleteOfficerError(payload))
    }
}

function* DeleteOfficerWatcher() {
    yield takeLatest(ACTIONS.DELETE_OFFICER, DeleteOfficerWorker)
}

function* GetAllOfficersWorker({payload}) {
    const authState = yield select(state => state.AuthState)
    try {
        if(!Object.keys(authState).length) {
            yield race({
                success: take(ACTIONS.AUTH),
                error: take(ACTIONS.SIGN_IN)
            })
        }
        if (authState.isFetching) {
            const { error } = yield race({
                success: take(ACTIONS.AUTH_SUCCESS),
                error: take(ACTIONS.AUTH_ERROR)
            })
            if (error) {
                throw new Error();
            }
        }
        const result = yield call(GetAllOfficersRequest, payload)
        yield put(GetAllOfficersSuccess({result, ...payload}))
    } catch {
        yield put(GetAllOfficersError(payload))
    }
}

function* GetAllOfficersWatcher() {
    yield takeLatest(ACTIONS.GET_ALL_OFFICERS, GetAllOfficersWorker)
}

function* GetOfficerWorker({payload}) {
    const authState = yield select(state => state.AuthState)
    try {
        if(!Object.keys(authState).length) {
            yield race({
                success: take(ACTIONS.AUTH),
                error: take(ACTIONS.SIGN_IN)
            })
        }
        if (authState.isFetching) {
            const { error } = yield race({
                success: take(ACTIONS.AUTH_SUCCESS),
                error: take(ACTIONS.AUTH_ERROR)
            })
            if (error) {
                throw new Error();
            }
        }
        const result = yield call(GetOfficerRequest, payload)
        yield put(GetOfficerSuccess({result, ...payload}))
    } catch {
        yield put(GetOfficerError(payload))
    }
}

function* GetOfficerWatcher() {
    yield takeLatest(ACTIONS.GET_OFFICER, GetOfficerWorker)
}

export default function* rootSaga() {
    yield all([
        call(signUpWatcher),
        call(SignInWatcher),
        call(AuthWatcher),
        call(CreateCaseWatcher),
        call(CreateCasePublicWatcher),
        call(EditCaseWatcher),
        call(DeleteCaseWatcher),
        call(GetAllCasesWatcher),
        call(GetOneCaseWatcher),
        call(CreateOfficerWatcher),
        call(UpdateOfficerWatcher),
        call(DeleteOfficerWatcher),
        call(GetAllOfficersWatcher),
        call(GetOfficerWatcher),
    ])
}