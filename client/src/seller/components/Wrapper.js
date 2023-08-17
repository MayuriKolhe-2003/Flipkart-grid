import React from 'react';
import SideBar from './SideBar';


function Wrapper() {
    return (
        <React.Fragment>
            {/*<!-- Content Wrapper -->*/}
            <div id="wrapper" width="100%">

                <SideBar />
                <div className="divmaldito my-5">

                </div>
            </div>
        </React.Fragment>
    )
}
export default Wrapper;