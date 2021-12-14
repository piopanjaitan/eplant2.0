import React, { useEffect } from "react"
import { Segment, Button, Dropdown, Label, Icon } from "semantic-ui-react";

import { useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { fetchUserInfo } from '../../redux/actions'


const Headers = ({ user }) => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    console.log(user)

    const handleItemClick = (e, { value }) => {
        navigate(`/${value}`)
    }

    useEffect(() => {
        dispatch(fetchUserInfo())

    }, [dispatch])

    const options = [
        { key: 'setting', icon: 'setting', text: 'Setting', value: 'setting', onClick: handleItemClick },
        { key: 'signout', icon: 'sign-out', text: 'Sign Out', value: 'signout', onClick: handleItemClick },
    ]

    const renderHeader = () => {
        return (
            <Segment.Inline clearing>
                <Button.Group
                    color='blue'
                    attached="top"
                    floated='right'
                    style={{ marginTop: '30px', paddingBottom: '20px', marginRight: '280px' }}>
                    <Button basic content={`Company Site : ${user.site}`} color='blue' style={{ marginRight: '10px' }} />
                    <Button  >
                        <Icon name='user circle outline' />
                        {user.loginid}
                    </Button>
                    <Dropdown

                        className='button icon'
                        floating
                        options={options}
                        trigger={<></>}
                    />
                </Button.Group >
            </Segment.Inline>


        )
    }

    if (!user)
        return (<>loading </>)

    return (renderHeader())



}

const mapStateToProps = state => {
    // console.log(state.auth.user)
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { fetchUserInfo })(Headers)
//export default Headers