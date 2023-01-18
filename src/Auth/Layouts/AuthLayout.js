import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { SocketWrapper } from '../../Components/Wrapper/SocketWrapper';
import SocketContextProvider from '../../Context/SocketContext';

export const AuthLayout = (props) => {
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userReducer.user)
    const [authStat, setAuthStat] = useState(null);

    useEffect(() => {
        if (userDetails.name) {
            setAuthStat(true);
        } else {
            setAuthStat(false);
            navigate('/login')
        }
    }, [userDetails]);

    return (
        <>
            {
                authStat === null ? <span>Loading....</span> :
                    authStat === true &&
                    <SocketContextProvider>
                        <SocketWrapper>
                            {props.children}
                        </SocketWrapper>
                    </SocketContextProvider>
            }

        </>
    )
}