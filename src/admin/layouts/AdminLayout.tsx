import {Outlet} from "react-router";

export const AdminLayout = () => {
    return (
        <div className='bg-blue-800 text-white'>
            <Outlet/>
        </div>
    );
};