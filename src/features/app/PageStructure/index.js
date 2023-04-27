import React from 'react';
import Header from "../../general/components/Header";

const PageStructure = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
        </div>
    );
};

export default PageStructure;