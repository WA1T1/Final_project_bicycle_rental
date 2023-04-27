import {createSelector} from "reselect";

const idSelector = (_, {id}) => id;
export const userSelector = state => state.user;
export const allCasesListStateSelector = state => state.allCasesListState
const caseStoreSelector = state => state.caseStore;
const caseStateStoreSelector = state => state.caseStateStore;
export const officerListSelector = state => state.officerList;
export const officerListStateSelector = state => state.fetchAllOfficersState;
const officerStoreSelector = state => state.officerStore;
const officerStateStoreSelector = state => state.officerStateStore;

export const caseSelector = createSelector(caseStoreSelector, idSelector, (caseStore, id) => caseStore[id] ?? {})
export const caseStateSelector = createSelector(caseStateStoreSelector, idSelector, (caseStateStore, id) => caseStateStore[id] ?? {
    isFetching: false,
    isError: false
})

export const officerSelector = createSelector(officerStoreSelector, idSelector, (officerStore, id) => officerStore[id] ?? {})
export const officerStateSelector = createSelector(officerStateStoreSelector, idSelector, (officerStateStore, id) => officerStateStore[id] ?? {
    isFetching: false,
    isError: false
})