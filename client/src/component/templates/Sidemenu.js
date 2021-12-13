import React, { useEffect, useMemo } from 'react'
import './sidebar.css'
import { Sidebar, Accordion, Image, Header } from 'semantic-ui-react'
import { useNavigate, Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'

import { fetchMenu } from '../../redux/actions'

const SideMenu = ({ ownProps, jsonData }) => {
    /* 
       const handleClick = event => {
           console.log(event)
       }
    */

    // console.log('re render menu')

    //let jsonData = children[1]

    console.log('sidemenu')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //  let jsonData = []


    let value = 1;



    //jsonData = menu.values

    //Main algorithm
    const accordify = (jsonData) => {

        if (jsonData.length === 0) {
            return;
        } else {
            for (let i = 0; i < jsonData.length; i++) {

                /*    if (!Array.isArray(jsonData[i]["content"])) {
                       console.log(jsonData[i])
                       jsonData[i] = {
                           content: (
                               < Accordion.Title
                                   key={jsonData[i].key}
                                   style={{ marginTop: '-10px', marginBottom: '10px', marginLeft: '10px' }}
                                   content={jsonData[i].title}
                                   onClick={(event) => {
                                       console.log(event.target.textContent);
                                   }}
                               />
                           )
                       }
                   }
                   else { */

                accordify(jsonData[i]["content"]);

                if (jsonData[i]["content"].length !== 0) {
                    jsonData[i]["content"] = {
                        content: (
                            <>
                                <Accordion.Accordion panels={jsonData[i]["content"]} style={{ marginTop: '0px', marginLeft: '30px' }} />
                                {
                                    jsonData[i]["contentvalues"].map(v => {
                                        //   console.log(v)
                                        return < Accordion.Title
                                            key={v.key}
                                            style={{ marginTop: '0px', marginBottom: '0px', marginLeft: '30px', color: 'blue !important' }}
                                            icon={v.icon}
                                            content={<Link to={`/${v.route}`}> {v.title} </Link>}
                                        /* onClick = {(e) => {
                                e.preventDefault();
                            <Link to="/profile">Visit your profile</Link>
                            navigate(`/${v.route}`, {replace: true })
                                        }} */
                                        />
                                    })
                                }

                            </>
                        ),
                    };
                } else {
                    jsonData[i]["content"] = {
                        content: (
                            jsonData[i]["contentvalues"].map(v => {

                                return < Accordion.Title
                                    key={v.key}
                                    style={{ marginTop: '0px', marginBottom: '0px', marginLeft: '30px', color: 'blue !important' }}
                                    icon={v.icon}
                                    content={v.title}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        navigate(`/${v.route}`, { replace: true })
                                    }}
                                />
                            })
                        ),
                    };

                }

            }

        }
    }

    const renderSidebar = () => {
        return (
            <Sidebar
                animation='push'
                icon='labeled'
                visible
            >
                <Image wrapped fluid
                    as={Header}
                    style={{ padding: '10px' }}
                    src="/ustp.png"
                />
                < Accordion
                    key='treemain'
                    className='treeMain'
                    panels={jsonData} />
            </Sidebar >
        )
    }

    /*  jsonData = [
        {
            "module": 1,
            "modulename": "General Setup",
            "submodule": 1,
            "title": "General Setup",
            "classname": "H",
            "icon": null,
            "route": null,
            "parameter1": null,
            "parameter2": null,
            "parameter3": null,
            "parameter4": null,
            "tipe": "HEADER",
            "isdetail": 0,
            "key": "1",
            "parent": null,
            "childs": [
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 63,
                    "title": "Setup Supplier Information",
                    "classname": "1F",
                    "icon": "options",
                    "route": null,
                    "parameter1": "S",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F63",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 21,
                    "title": "Activity Location Control",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "Activity Location",
                    "parameter3": "Activity Location",
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F21",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 26,
                    "title": "Application Setup",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "BB",
                    "parameter3": "BB",
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F26",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 27,
                    "title": "Organization",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "BB",
                    "parameter3": "BB",
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F27",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 18,
                    "title": "Update Location",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "Update Location",
                    "parameter3": "Click Start to Update Location Table",
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F18",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 24,
                    "title": "Currency Daily Rate",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "Currency Detail",
                    "parameter3": "Currency Detail",
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F24",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 3,
                    "title": "User Accessrights",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F3",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 4,
                    "title": "View Error Log/Message",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F4",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 5,
                    "title": "Parameter Master",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F5",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 11,
                    "title": "Period Control",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F11",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 12,
                    "title": "GL Control",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F12",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 28,
                    "title": "Cost Center",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F28",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 29,
                    "title": "Approval",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F29",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 30,
                    "title": "Change Password",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F30",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 31,
                    "title": "Message Room",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F31",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 32,
                    "title": "Registry Report",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F32",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 33,
                    "title": "Setup Document Code",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F33",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 37,
                    "title": "Generate Table Data to HO",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F37",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 38,
                    "title": "Transfer Data to SITE",
                    "classname": "1R",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11R38",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 39,
                    "title": "Generate Data Master",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F39",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 300,
                    "title": "Change Password",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F300",
                    "parent": "1"
                }
            ],
            "contentvalues": [
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 63,
                    "title": "Setup Supplier Information",
                    "classname": "1F",
                    "icon": "options",
                    "route": null,
                    "parameter1": "S",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F63",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 21,
                    "title": "Activity Location Control",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "Activity Location",
                    "parameter3": "Activity Location",
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F21",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 26,
                    "title": "Application Setup",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "BB",
                    "parameter3": "BB",
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F26",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 27,
                    "title": "Organization",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "BB",
                    "parameter3": "BB",
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F27",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 18,
                    "title": "Update Location",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "Update Location",
                    "parameter3": "Click Start to Update Location Table",
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F18",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 24,
                    "title": "Currency Daily Rate",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "Currency Detail",
                    "parameter3": "Currency Detail",
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F24",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 3,
                    "title": "User Accessrights",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F3",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 4,
                    "title": "View Error Log/Message",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F4",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 5,
                    "title": "Parameter Master",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F5",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 11,
                    "title": "Period Control",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F11",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 12,
                    "title": "GL Control",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F12",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 28,
                    "title": "Cost Center",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F28",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 29,
                    "title": "Approval",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F29",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 30,
                    "title": "Change Password",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F30",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 31,
                    "title": "Message Room",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F31",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 32,
                    "title": "Registry Report",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F32",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 33,
                    "title": "Setup Document Code",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F33",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 37,
                    "title": "Generate Table Data to HO",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F37",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 38,
                    "title": "Transfer Data to SITE",
                    "classname": "1R",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11R38",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 39,
                    "title": "Generate Data Master",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F39",
                    "parent": "1"
                },
                {
                    "module": 1,
                    "modulename": "General Setup",
                    "submodule": 300,
                    "title": "Change Password",
                    "classname": "1F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 0,
                    "key": "11F300",
                    "parent": "1"
                }
            ],
            "content": []
        },
        {
            "module": 11,
            "modulename": "Cash/Bank",
            "submodule": 11,
            "title": "Cash/Bank",
            "classname": "H",
            "icon": null,
            "route": null,
            "parameter1": null,
            "parameter2": null,
            "parameter3": null,
            "parameter4": null,
            "tipe": "HEADER",
            "isdetail": 1,
            "key": "11",
            "parent": null,
            "childs": [
                {
                    "module": 11,
                    "modulename": "Cash/Bank",
                    "submodule": 60,
                    "title": "Setup",
                    "classname": "S",
                    "icon": "options",
                    "route": null,
                    "parameter1": "S",
                    "parameter2": "Cash Bank Setup",
                    "parameter3": "1",
                    "parameter4": "0",
                    "tipe": "FOLDER",
                    "isdetail": 1,
                    "key": "11S",
                    "parent": "11",
                    "childs": [
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 61,
                            "title": "Parameter Master",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": "1",
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S61",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 7,
                            "title": "Setup Supplier Bank",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S7",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 8,
                            "title": "Setup Bank Information",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S8",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 109,
                            "title": "Setup Contractor Bank",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S109",
                            "parent": "11S"
                        }
                    ],
                    "contentvalues": [
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 61,
                            "title": "Parameter Master",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": "1",
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S61",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 7,
                            "title": "Setup Supplier Bank",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S7",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 8,
                            "title": "Setup Bank Information",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S8",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 109,
                            "title": "Setup Contractor Bank",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S109",
                            "parent": "11S"
                        }
                    ],
                    "content": []
                },
                {
                    "module": 11,
                    "modulename": "Cash/Bank",
                    "submodule": 50,
                    "title": "Input",
                    "classname": "F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "Cash Bank Data Entry",
                    "parameter3": "1",
                    "parameter4": "1",
                    "tipe": "FOLDER",
                    "isdetail": 1,
                    "key": "11F",
                    "parent": "11",
                    "childs": [
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 1,
                            "title": "Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F1",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 2,
                            "title": "Receive Voucher  ",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F2",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 3,
                            "title": "Approval Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F3",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 4,
                            "title": "UnApprove Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F4",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 501,
                            "title": "Permintaan Anggaran",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F501",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 502,
                            "title": "Daftar Pembayaran",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F502",
                            "parent": "11F"
                        }
                    ],
                    "contentvalues": [
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 1,
                            "title": "Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F1",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 2,
                            "title": "Receive Voucher  ",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F2",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 3,
                            "title": "Approval Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F3",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 4,
                            "title": "UnApprove Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F4",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 501,
                            "title": "Permintaan Anggaran",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F501",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 502,
                            "title": "Daftar Pembayaran",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F502",
                            "parent": "11F"
                        }
                    ],
                    "content": []
                },
                {
                    "module": 11,
                    "modulename": "Cash/Bank",
                    "submodule": 6,
                    "title": "Close/Reopen Cash Book",
                    "classname": "C",
                    "icon": "hockey puck",
                    "route": null,
                    "parameter1": "C",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 1,
                    "key": "11C6",
                    "parent": "11"
                }
            ],
            "contentvalues": [
                {
                    "module": 11,
                    "modulename": "Cash/Bank",
                    "submodule": 6,
                    "title": "Close/Reopen Cash Book",
                    "classname": "C",
                    "icon": "hockey puck",
                    "route": null,
                    "parameter1": "C",
                    "parameter2": null,
                    "parameter3": null,
                    "parameter4": null,
                    "tipe": "FORM",
                    "isdetail": 1,
                    "key": "11C6",
                    "parent": "11"
                }
            ],
            "content": [
                {
                    "module": 11,
                    "modulename": "Cash/Bank",
                    "submodule": 60,
                    "title": "Setup",
                    "classname": "S",
                    "icon": "options",
                    "route": null,
                    "parameter1": "S",
                    "parameter2": "Cash Bank Setup",
                    "parameter3": "1",
                    "parameter4": "0",
                    "tipe": "FOLDER",
                    "isdetail": 1,
                    "key": "11S",
                    "parent": "11",
                    "childs": [
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 61,
                            "title": "Parameter Master",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": "1",
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S61",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 7,
                            "title": "Setup Supplier Bank",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S7",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 8,
                            "title": "Setup Bank Information",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S8",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 109,
                            "title": "Setup Contractor Bank",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S109",
                            "parent": "11S"
                        }
                    ],
                    "contentvalues": [
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 61,
                            "title": "Parameter Master",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": "1",
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S61",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 7,
                            "title": "Setup Supplier Bank",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S7",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 8,
                            "title": "Setup Bank Information",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S8",
                            "parent": "11S"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 109,
                            "title": "Setup Contractor Bank",
                            "classname": "11S",
                            "icon": "options",
                            "route": null,
                            "parameter1": "S",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111S109",
                            "parent": "11S"
                        }
                    ],
                    "content": []
                },
                {
                    "module": 11,
                    "modulename": "Cash/Bank",
                    "submodule": 50,
                    "title": "Input",
                    "classname": "F",
                    "icon": "edit",
                    "route": null,
                    "parameter1": "F",
                    "parameter2": "Cash Bank Data Entry",
                    "parameter3": "1",
                    "parameter4": "1",
                    "tipe": "FOLDER",
                    "isdetail": 1,
                    "key": "11F",
                    "parent": "11",
                    "childs": [
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 1,
                            "title": "Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F1",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 2,
                            "title": "Receive Voucher  ",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F2",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 3,
                            "title": "Approval Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F3",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 4,
                            "title": "UnApprove Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F4",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 501,
                            "title": "Permintaan Anggaran",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,

                            "key": "1111F501",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 502,
                            "title": "Daftar Pembayaran",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F502",
                            "parent": "11F"
                        }
                    ],
                    "contentvalues": [
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 1,
                            "title": "Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F1",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 2,
                            "title": "Receive Voucher  ",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F2",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 3,
                            "title": "Approval Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F3",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 4,
                            "title": "UnApprove Payment Voucher",
                            "classname": "11F",
                            "icon": "edit",
                            "route": 'bankinformation',
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F4",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 501,
                            "title": "Permintaan Anggaran",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F501",
                            "parent": "11F"
                        },
                        {
                            "module": 11,
                            "modulename": "Cash/Bank",
                            "submodule": 502,
                            "title": "Daftar Pembayaran",
                            "classname": "11F",
                            "icon": "edit",
                            "route": null,
                            "parameter1": "F",
                            "parameter2": null,
                            "parameter3": null,
                            "parameter4": null,
                            "tipe": "FORM",
                            "isdetail": 1,
                            "key": "1111F502",
                            "parent": "11F"
                        }
                    ],
                    "content": []
                }
            ]
        }
    ] */


    useEffect(() => {
        dispatch(fetchMenu())

    }, [dispatch])


    useMemo(() => {
        //  jsonData = menu

        accordify(jsonData)
        console.log('first render value ');

    }, [jsonData]);




    if (jsonData.length === 0) {
        //console.log('loading')
        return (<> Loading </>)
    } else {
        return renderSidebar()
    }
}

const mapStateToProps = (state) => {

    return {
        jsonData: state.menu.menu.values
    }
}


export default connect(mapStateToProps, { fetchMenu })(SideMenu)

//export default SideMenu