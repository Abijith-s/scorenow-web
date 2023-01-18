import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


export const NonAuthLayout = (props) => {

    const navigate = useNavigate();
    const userDetails = useSelector(state => state.userReducer.user)
    const [authStat, setAuthStat] = useState(null);

    useEffect(() => {
        if (userDetails.name) {
            setAuthStat(true);
            navigate('/')
        } else {
            setAuthStat(false);
        }
    }, [userDetails])
    return (
        <>
            {
                authStat === null ? <span>Loading....</span> :
                    authStat === false && props.children
            }

        </>
    )
}