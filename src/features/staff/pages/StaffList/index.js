import React, {useEffect, useRef} from 'react';
import PageStructure from "../../../app/PageStructure";
import {useDispatch, useSelector} from "react-redux";
import {GetAllOfficers} from "../../../../additional/store/actions";
import {officerListSelector, officerListStateSelector} from "../../../../additional/store/selectors";
import StaffListItem from "../../components/StaffListItem";
import ErrorMessage from "../../../general/components/ErrorMessage";
import {useLoader} from "../../../../additional/hooks/LoaderFolder/useLoader";

const StaffList = () => {
    const dispatch = useDispatch();
    const loader = useLoader()
    useEffect(()=>{
        dispatch(GetAllOfficers({}))
    },[])

    const staffList = useSelector(officerListSelector)
    const staffListState = useSelector(officerListStateSelector)

    const firstRender = useRef(true)
    useEffect(()=>{
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        if(staffListState.isFetching) {
            loader.start()
        }
        else {
            loader.stop();
        }
    },[staffListState, loader])

    if (staffListState.isError) {
        return <ErrorMessage/>
    }

    return (
        <PageStructure>
            {staffList && staffList.map(officer => <StaffListItem key={officer._id} id={officer._id} approved={officer.approved} email={officer.email} name={officer.firstName} surname={officer.lastName}/>)}
        </PageStructure>
    );
};

export default StaffList;