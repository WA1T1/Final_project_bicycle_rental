import {ACTIONS} from "./actions";

const initialState = {
    signUpState: {},

    signUpResult: {},

    AuthState: {},

    caseList: [],
    allCasesListState: {},

    caseStore: {},
    caseStateStore: {},

    officerList: [],
    fetchAllOfficersState: {},

    officerStore: {},
    officerStateStore: {},

    prov: '',

    token: '',

    user: {}
}

export const reduser = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SIGN_UP:
            return {
                ...state,
                signUpState: {
                    isFetching: true,
                    isError: false,
                }
            }
        case ACTIONS.SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpState: {
                    isFetching: false,
                    isError: false,
                }
            }
        case ACTIONS.SIGN_UP_ERROR:
            return {
                ...state,
                signUpResult: action.err,
                signUpState: {
                    isFetching: false,
                    isError: true,
                }}

        case ACTIONS.SIGN_IN:
            return {
                ...state,
                AuthState: {
                    isFetching: true,
                    isError: false,
                }
            }
        case ACTIONS.SIGN_IN_SUCCESS:
            return {
                ...state,
                token: action.payload.result.token,
                user: action.payload.result.user,
                AuthState: {
                    isFetching: false,
                    isError: false,
                }
            }
        case ACTIONS.SIGN_IN_ERROR:
            return {
                ...state,
                AuthState: {
                    isFetching: false,
                    isError: true,
                }
            }

        case ACTIONS.UNLOGIN:
            return {
                ...state,
                token: '',
                user: {},
            }

        case ACTIONS.AUTH:
            return {
                ...state,
                token: action.payload.token,
                AuthState: {
                    isFetching: true,
                    isError: false,
                }
            }
        case ACTIONS.AUTH_SUCCESS:
            console.log(action.payload.result.user)
            console.log(state)
            return {
                ...state,
                token: action.payload.result.token,
                user: action.payload.result.user,
                AuthState: {
                    isFetching: false,
                    isError: false,
                }
            }
        case ACTIONS.AUTH_ERROR:
            return {...state,
                AuthState: {
                    isFetching: false,
                    isError: true,
                }
            }

        case ACTIONS.CREATE_CASE:
            return {...state}
        case ACTIONS.CREATE_CASE_SUCCESS:
            return {...state}
        case ACTIONS.CREATE_CASE_ERROR:
            return {...state}

        case ACTIONS.CREATE_CASE_PUBLIC:
            return {...state}
        case ACTIONS.CREATE_CASE_PUBLIC_SUCCESS:
            return {...state}
        case ACTIONS.CREATE_CASE_PUBLIC_ERROR:
            return {...state}

        case ACTIONS.EDIT_CASE:
            return {...state}
        case ACTIONS.EDIT_CASE_SUCCESS:
            return {...state}
        case ACTIONS.EDIT_CASE_ERROR:
            return {...state}

        case ACTIONS.DELETE_CASE:
            return {...state}
        case ACTIONS.DELETE_CASE_SUCCESS:
            return {...state}
        case ACTIONS.DELETE_CASE_ERROR:
            return {...state}

        case ACTIONS.GET_ALL_CASES:
            return {
                ...state,
                allCasesListState: {
                    isFetching: true,
                    isError: false,
                },
            }
        case ACTIONS.GET_ALL_CASES_SUCCESS:
            return {
                ...state,
                caseList: action.payload.result,
                allCasesListState: {
                    isFetching: false,
                    isError: false,
                },
            }
        case ACTIONS.GET_ALL_CASES_ERROR:
            return {
                ...state,
                allCasesListState: {
                    isFetching: false,
                    isError: true,
                },
            }

        case ACTIONS.GET_ONE_CASE:
            return {
                ...state,
                caseStateStore: {
                    ...state.caseStateStore,
                    [action.payload.id]: {
                        isFetching: true,
                        isError: false,
                    }
                }}
        case ACTIONS.GET_ONE_CASE_SUCCESS:
            return {
                ...state,
                caseStore: {
                    ...state.caseStore,
                    [action.payload.id]: action.payload.result,
                },
                caseStateStore: {
                    ...state.caseStateStore,
                    [action.payload.id]: {
                        isFetching: false,
                        isError: false,
                    }
                }}
        case ACTIONS.GET_ONE_CASE_ERROR:
            return {
            ...state,
            caseStateStore: {
                ...state.caseStateStore,
                [action.payload.id]: {
                    isFetching: false,
                    isError: true,
                }
            }}

        case ACTIONS.CREATE_OFFICER:
            return {...state}
        case ACTIONS.CREATE_OFFICER_SUCCESS:
            return {...state}
        case ACTIONS.CREATE_OFFICER_ERROR:
            return {...state}

        case ACTIONS.UPDATE_OFFICER:
            return {...state}
        case ACTIONS.UPDATE_OFFICER_SUCCESS:
            return {...state}
        case ACTIONS.UPDATE_OFFICER_ERROR:
            return {...state}

        case ACTIONS.DELETE_OFFICER:
            return {...state}
        case ACTIONS.DELETE_OFFICER_SUCCESS:
            return {...state}
        case ACTIONS.DELETE_OFFICER_ERROR:
            return {...state}

        case ACTIONS.GET_ALL_OFFICERS:
            return {
                ...state,
                fetchAllOfficersState: {
                    isFetching: true,
                    isError: false
                },
            }
        case ACTIONS.GET_ALL_OFFICERS_SUCCESS:
            return {
                ...state,
                officerList: action.payload.result.officers,
                fetchAllOfficersState: {
                    isFetching: false,
                    isError: false
                },
            }
        case ACTIONS.GET_ALL_OFFICERS_ERROR:
            return {
                ...state,
                fetchAllOfficersState: {
                    isFetching: false,
                    isError: true
                },
            }

        case ACTIONS.GET_OFFICER:
            return {
                ...state,
                officerStateStore: {
                    ...state.officerStateStore,
                    [action.payload.id]: {
                        isFetching: true,
                        isError: false,
                    }
                }
            }
        case ACTIONS.GET_OFFICER_SUCCESS:
            return {
                ...state,
                officerStore: {
                    ...state.officerStore,
                    [action.payload.id]: action.payload.result,
                },
                officerStateStore: {
                    ...state.officerStateStore,
                    [action.payload.id]: {
                        isFetching: false,
                        isError: false,
                    }
                }
            }
        case ACTIONS.GET_OFFICER_ERROR:
            return {
                ...state,
                officerStateStore: {
                    ...state.officerStateStore,
                    [action.payload.id]: {
                        isFetching: false,
                        isError: true,
                    }
                }}
        default:
            return state
    }
}