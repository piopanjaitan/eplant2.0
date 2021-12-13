import React from "react"
import { Segment, Button, Dropdown } from "semantic-ui-react";

import { Outlet, useNavigate } from 'react-router-dom'

const Headers = () => {


    const navigate = useNavigate()
    //const [activeItem, setActiveItem] = useState('inbox')

    const handleItemClick = (e, { value }) => {
        navigate(`/${value}`)
    }

    const options = [
        { key: 'setting', icon: 'setting', text: 'Setting', value: 'setting', onClick: handleItemClick },
        { key: 'signout', icon: 'sign-out', text: 'Sign Out', value: 'signout', onClick: handleItemClick },
    ]

    return (

        <Button.Group
            as={Segment.basic}
            attached="top"
            color='blue'
            floated='right'
            style={{ marginTop: '30px', paddingBottom: '20px', marginRight: '280px' }}>
            <Button content='LOGIN ID' />
            <Dropdown
                className='button icon'
                floating
                options={options}
                trigger={<></>}
            />
        </Button.Group >

    )
}



export default Headers