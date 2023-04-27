export const ACTIONS = {
    SIGN_UP: 'SIGN_UP',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_ERROR: 'SIGN_UP_ERROR',

    SIGN_IN: 'SIGN_IN',
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SIGN_IN_ERROR: 'SIGN_IN_ERROR',

    UNLOGIN: 'UNLOGIN',

    AUTH: 'AUTH',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_ERROR: 'AUTH_ERROR',

    CREATE_CASE: 'CREATE_CASE',
    CREATE_CASE_SUCCESS: 'CREATE_CASE_SUCCESS',
    CREATE_CASE_ERROR: 'CREATE_CASE_ERROR',

    CREATE_CASE_PUBLIC: 'CREATE_CASE_PUBLIC',
    CREATE_CASE_PUBLIC_SUCCESS: 'CREATE_CASE_PUBLIC_SUCCESS',
    CREATE_CASE_PUBLIC_ERROR: 'CREATE_CASE_PUBLIC_ERROR',

    EDIT_CASE: 'EDIT_CASE',
    EDIT_CASE_SUCCESS: 'EDIT_CASE_SUCCESS',
    EDIT_CASE_ERROR: 'EDIT_CASE_ERROR',

    DELETE_CASE: 'DELETE_CASE',
    DELETE_CASE_SUCCESS: 'DELETE_CASE_SUCCESS',
    DELETE_CASE_ERROR: 'DELETE_CASE_ERROR',

    GET_ALL_CASES: 'GET_ALL_CASES',
    GET_ALL_CASES_SUCCESS: 'GET_ALL_CASES_SUCCESS',
    GET_ALL_CASES_ERROR: 'GET_ALL_CASES_ERROR',

    GET_ONE_CASE: 'GET_ONE_CASE',
    GET_ONE_CASE_SUCCESS: 'GET_ONE_CASE_SUCCESS',
    GET_ONE_CASE_ERROR: 'GET_ONE_CASE_ERROR',

    CREATE_OFFICER: 'CREATE_OFFICER',
    CREATE_OFFICER_SUCCESS: 'CREATE_OFFICER_SUCCESS',
    CREATE_OFFICER_ERROR: 'CREATE_OFFICER_ERROR',

    UPDATE_OFFICER: 'UPDATE_OFFICER',
    UPDATE_OFFICER_SUCCESS: 'UPDATE_OFFICER_SUCCESS',
    UPDATE_OFFICER_ERROR: 'UPDATE_OFFICER_ERROR',

    DELETE_OFFICER: 'DELETE_OFFICER',
    DELETE_OFFICER_SUCCESS: 'DELETE_OFFICER_SUCCESS',
    DELETE_OFFICER_ERROR: 'DELETE_OFFICER_ERROR',

    GET_ALL_OFFICERS: 'GET_ALL_OFFICERS',
    GET_ALL_OFFICERS_SUCCESS: 'GET_ALL_OFFICERS_SUCCESS',
    GET_ALL_OFFICERS_ERROR: 'GET_ALL_OFFICERS_ERROR',

    GET_OFFICER: 'GET_OFFICER',
    GET_OFFICER_SUCCESS: 'GET_OFFICER_SUCCESS',
    GET_OFFICER_ERROR: 'GET_OFFICER_ERROR',
}

export const signUp = payload => ({
    type: ACTIONS.SIGN_UP,
    payload
});
export const signUpSuccess = payload => ({
    type: ACTIONS.SIGN_UP_SUCCESS,
    payload
});
export const signUpError = payload => ({
    type: ACTIONS.SIGN_UP_ERROR,
    payload
});

export const signIn = payload => ({
    type: ACTIONS.SIGN_IN,
    payload
});
export const signInSuccess = payload => ({
    type: ACTIONS.SIGN_IN_SUCCESS,
    payload
});
export const signInError = payload => ({
    type: ACTIONS.SIGN_IN_ERROR,
    payload
});

export const unlogin = payload => ({
    type: ACTIONS.UNLOGIN,
    payload
});

export const Auth = payload => ({
    type: ACTIONS.AUTH,
    payload
});
export const AuthSuccess = payload => ({
    type: ACTIONS.AUTH_SUCCESS,
    payload
});
export const AuthError = payload => ({
    type: ACTIONS.AUTH_ERROR,
    payload
});

export const CreateCase = payload => ({
    type: ACTIONS.CREATE_CASE,
    payload
});
export const CreateCaseSuccess = payload => ({
    type: ACTIONS.CREATE_CASE_SUCCESS,
    payload
});
export const CreateCaseError = payload => ({
    type: ACTIONS.CREATE_CASE_ERROR,
    payload
});

export const CreateCasePublic = payload => ({
    type: ACTIONS.CREATE_CASE_PUBLIC,
    payload
});
export const CreateCasePublicSuccess = payload => ({
    type: ACTIONS.CREATE_CASE_PUBLIC_SUCCESS,
    payload
});
export const CreateCasePublicError = payload => ({
    type: ACTIONS.CREATE_CASE_PUBLIC_ERROR,
    payload
});

export const EditCase = payload => ({
    type: ACTIONS.EDIT_CASE,
    payload
});
export const EditCaseSuccess = payload => ({
    type: ACTIONS.EDIT_CASE_SUCCESS,
    payload
});
export const EditCaseError = payload => ({
    type: ACTIONS.EDIT_CASE_ERROR,
    payload
});

export const DeleteCase = payload => ({
    type: ACTIONS.DELETE_CASE,
    payload
});
export const DeleteCaseSuccess = payload => ({
    type: ACTIONS.DELETE_CASE_SUCCESS,
    payload
});
export const DeleteCaseError = payload => ({
    type: ACTIONS.DELETE_CASE_ERROR,
    payload
});

export const GetAllCases = payload => ({
    type: ACTIONS.GET_ALL_CASES,
    payload
});
export const GetAllCasesSuccess = payload => ({
    type: ACTIONS.GET_ALL_CASES_SUCCESS,
    payload
});
export const GetAllCasesError = payload => ({
    type: ACTIONS.GET_ALL_CASES_ERROR,
    payload
});

export const GetOneCase = payload => ({
    type: ACTIONS.GET_ONE_CASE,
    payload
});
export const GetOneCaseSuccess = payload => ({
    type: ACTIONS.GET_ONE_CASE_SUCCESS,
    payload
});
export const GetOneCaseError = payload => ({
    type: ACTIONS.GET_ONE_CASE_ERROR,
    payload
});

export const CreateOfficer = payload => ({
    type: ACTIONS.CREATE_OFFICER,
    payload
});
export const CreateOfficerSuccess = payload => ({
    type: ACTIONS.CREATE_OFFICER_SUCCESS,
    payload
});
export const CreateOfficerError = payload => ({
    type: ACTIONS.CREATE_OFFICER_ERROR,
    payload
});

export const UpdateOfficer = payload => ({
    type: ACTIONS.UPDATE_OFFICER,
    payload
});
export const UpdateOfficerSuccess = payload => ({
    type: ACTIONS.UPDATE_OFFICER_SUCCESS,
    payload
});
export const UpdateOfficerError = payload => ({
    type: ACTIONS.UPDATE_OFFICER_ERROR,
    payload
});

export const DeleteOfficer = payload => ({
    type: ACTIONS.DELETE_OFFICER,
    payload
});
export const DeleteOfficerSuccess = payload => ({
    type: ACTIONS.DELETE_OFFICER_SUCCESS,
    payload
});
export const DeleteOfficerError = payload => ({
    type: ACTIONS.DELETE_OFFICER_ERROR,
    payload
});

export const GetAllOfficers = payload => ({
    type: ACTIONS.GET_ALL_OFFICERS,
    payload
});
export const GetAllOfficersSuccess = payload => ({
    type: ACTIONS.GET_ALL_OFFICERS_SUCCESS,
    payload
});
export const GetAllOfficersError = payload => ({
    type: ACTIONS.GET_ALL_OFFICERS_ERROR,
    payload
});

export const GetOfficer = payload => ({
    type: ACTIONS.GET_OFFICER,
    payload
});
export const GetOfficerSuccess = payload => ({
    type: ACTIONS.GET_OFFICER_SUCCESS,
    payload
});
export const GetOfficerError = payload => ({
    type: ACTIONS.GET_OFFICER_ERROR,
    payload
});