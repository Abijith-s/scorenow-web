import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


export const AdminNonAuthLayout = (props) => {

    const navigate = useNavigate();
    const adminMessage = useSelector(state => state.adminReducer.adminUserMessage)
    const [authStat, setAuthStat] = useState(null);

    useEffect(() => {
        if (adminMessage==="admin login successfull") {
            setAuthStat(true);
            navigate('/admin/home')
        } else {
            setAuthStat(false);
        }
    }, [adminMessage])
    return (
        <>
            {
                authStat === null ? <span>Loading....</span> :
                    authStat === false && props.children
            }

        </>
    )
}