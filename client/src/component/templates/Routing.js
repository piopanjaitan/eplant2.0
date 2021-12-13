import React from 'react'
import { useLocation } from 'react-router-dom';

const Routing = ({ children }) => {


    const location = useLocation();
    console.log(location.pathname);
    //console.log(children)

    const renderPlain = () => {
        return <div>{children}</div>
    }

    const renderWith = () => {
        return (
            <>
                {children}
            </>
        )
    }


    if (location.pathname === '/signin') {
        return renderPlain()
    }
    else {
        return renderWith()
    }

}

export default Routing
