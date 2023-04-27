import React, {useEffect, useRef} from 'react';
import PageStructure from "../../../app/PageStructure";
import TheftReportListItem from "../../components/TheftReportListItem";
import {useDispatch, useSelector} from "react-redux";
import {GetAllCases} from "../../../../additional/store/actions";
import {allCasesListStateSelector} from "../../../../additional/store/selectors";
import {useLoader} from "../../../../additional/hooks/LoaderFolder/useLoader";
import ErrorMessage from "../../../general/components/ErrorMessage";

const TheftReportList = () => {
    const dispatch = useDispatch()
    const loader = useLoader()
    const reportList = useSelector(state => state.caseList)
    const reportListState = useSelector(allCasesListStateSelector)
    useEffect(()=>{
        dispatch(GetAllCases({}))
    },[])

    const firstRender = useRef(true)
    useEffect(()=>{
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        if(reportListState.isFetching) {
            loader.start()
        }
        else {
            loader.stop();
        }
    },[reportListState, loader])

    if (reportListState.isError) {
        return <ErrorMessage/>
    }

    return (
        <PageStructure>
            {reportList && reportList.map(report => <TheftReportListItem key={report._id} id={report._id} description={report.description} date={report.date} name={report.ownerFullName} type={report.type} color={report.color}/>)}
        </PageStructure>
    );
};

export default TheftReportList;