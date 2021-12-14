import React, { useEffect, useMemo, useCallback, useRef, useState } from 'react'
import './sidebar.css'
import { Sidebar, Accordion, Image, Header } from 'semantic-ui-react'
import { useNavigate, Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'

import { fetchMenu } from '../../redux/actions'

const SideMenu = ({ ownProps, jsonData }) => {

    //let jsonData = children[1]
    const Isrerender = useRef(0)
    const dispatch = useDispatch()


    useEffect(() => {
        Isrerender.current = Isrerender.current + 1;
    });

    //Main algorithm
    const accordify = jsonData => {

        if (jsonData.length === 0) {
            return;
        } else {
            for (let i = 0; i < jsonData.length; i++) {


                accordify(jsonData[i]["content"]);

                if (jsonData[i]["content"].length !== 0) {
                    jsonData[i]["content"] = {
                        content: (
                            <>
                                <Accordion.Accordion panels={jsonData[i]["content"]} style={{ marginTop: '0px', marginLeft: '30px' }} />
                                {
                                    jsonData[i]["contentvalues"].map(v => {
                                        return < Accordion.Title
                                            key={v.key}
                                            style={{ marginTop: '0px', marginBottom: '0px', marginLeft: '30px' }}
                                            icon={v.icon}
                                            content={<Link to={`/${v.route}`}> {v.title} </Link>}
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
                                    style={{ marginTop: '0px', marginBottom: '0px', marginLeft: '30px' }}
                                    icon={v.icon}
                                    content={<Link to={`/${v.route}`}> {v.title} </Link>}
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

    const renderLoading = () => {
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
                <>Loading</>
            </Sidebar >
        )
    }

    useEffect(() => {
        dispatch(fetchMenu())

    }, [dispatch])

    if (Isrerender.current === 1) {
        accordify(jsonData)
    }


    if (jsonData.length === 0)
        return renderLoading()

    return renderSidebar()

}

const mapStateToProps = state => {
    return {
        jsonData: state.menu.menu.values
    }
}


export default connect(mapStateToProps, { fetchMenu })(SideMenu)