import React from 'react'

import { Sidebar, Segment, Loader, Dimmer } from 'semantic-ui-react'
import { connect, useDispatch } from 'react-redux'
import Headers from './Headers'
import SideMenu from './Sidemenu'
import Footer from './Footer'
import { useEffect } from 'react'

import { fetchMenu } from "../../redux/actions";
import { Outlet } from 'react-router-dom'



const Header = ({ menu }) => {
    console.log('render header')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMenu())

    }, [dispatch])


    const renderPage = () => {



        if (menu.length === 0) {

            return (
                <Segment.Group style={{ paddingTop: '100vh' }}>
                    <Dimmer active inverted >
                        <Loader size='massive' inline>Loading</Loader>
                    </Dimmer>
                </Segment.Group>)
        } else {
            return (
                /*         <div className="ui wrapper" style={{ height: '95vh', backgroundColor: 'red' }} > */
                <Segment.Group style={{ height: '95vh' }} >
                    <Sidebar.Pushable as={Segment} >
                        <SideMenu />
                        <Sidebar.Pusher>
                            <Headers />
                            <Outlet />
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                    <Footer />
                </Segment.Group>
            )

        }


    }

    return (
        renderPage()
    )
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu.menu
    }
}


//export default Header
export default connect(mapStateToProps, { fetchMenu })(Header)