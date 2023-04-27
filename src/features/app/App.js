import './GlobalStyles.css';
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../general/pages/Home";
import TheftReportList from "../theftReports/pages/TheftReportList";
import moment from "moment";
import 'moment/locale/ru'
import TheftReportDetail from "../theftReports/pages/TheftReportDetail";
import StaffList from "../staff/pages/StaffList";
import StaffDetail from "../staff/pages/StaffDetail";
import AccessRestriction from "../../additional/hooks/AuthFolder/AccessRestriction";

function App() {
    moment.locale('ru')
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/theftReportList",
            element: <AccessRestriction><TheftReportList/></AccessRestriction>,
        },
        {
            path: "/thiefReportDetail/:id",
            element: <AccessRestriction><TheftReportDetail/></AccessRestriction>,
        },
        {
            path: "/staffList",
            element: <AccessRestriction><StaffList/></AccessRestriction>,
        },
        {
            path: '/staffDetail/:id',
            element: <AccessRestriction><StaffDetail/></AccessRestriction>,
        },
    ]);

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
