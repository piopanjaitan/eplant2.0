import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ChildComponent = ChildComponent => {

    function ComposedComponent() {
        const navigate = useNavigate();

        const auths = useSelector((state) => state.auth.authenticated)

        const authHandler = () => {
            if (!auths)
                navigate('/signin')
        }

        useEffect(() => {
            authHandler()
        });


        return <ChildComponent />
    }
    /* 
        const mapStateToProps = state => {
            return { auths: state.auth.authenticated }
        }
     */

    //    return connect(mapStateToProps)(ComposedComponent)
    return ComposedComponent
}

export default ChildComponent