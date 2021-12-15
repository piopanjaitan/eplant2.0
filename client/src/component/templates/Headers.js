import React from "react"
import { Segment, Button, Dropdown, Label, Icon } from "semantic-ui-react";

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Headers = () => {
    const navigate = useNavigate()

    /* const dispatch = useDispatch() */

    const authuser = useSelector((state) => state.menu.menu.user)



    const handleItemClick = (e, { value }) => {
        navigate(`/${value}`)
    }


    const options = [
        { key: 'setting', icon: 'setting', text: 'Setting', value: 'setting', onClick: handleItemClick },
        { key: 'signout', icon: 'sign-out', text: 'Sign Out', value: 'signout', onClick: handleItemClick },
    ]

    const renderHeader = () => {
        return (
            <Segment.Inline >
                <Button.Group
                    color='blue'
                    attached="top"
                    floated='right'
                    style={{ marginTop: '30px', paddingBottom: '20px', marginRight: '280px' }}>
                    <Button basic content={`Company Site : ${authuser.site}`} color='blue' style={{ marginRight: '10px' }} />
                    <Button>
                        <Icon name='user circle outline' />
                        {authuser.loginid}
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

    if (!authuser)
        return (<>loading </>)

    return (renderHeader())



}
export default Headers 