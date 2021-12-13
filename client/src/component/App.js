import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Signin from './auth/Signin'
import Routing from './templates/Routing'
import NotFound from './templates/NotFound'
import Content from './Content'
import SetupBankList from './modules/setupbank/SetupBankList'
import Signout from './auth/Signout'

import { connect } from 'react-redux'
import Header from './templates/ContainerHeader'


const App = (state) => {
    const idx = 1

    const UnAuthorized = () => {
        return (
            <Routes message="" >
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/signin" exact element={<Signin />} />
            </Routes>
        )
    }

    const BankInformationRoutes = () => {

        return (
            <Routes message="" >

                <Route path="/" element={<Header />} >
                    <Route index element={<Dashboard />} />
                    <Route path="/signin" exact element={<Signin />} />
                    <Route path="/signout" exact element={<Signout />} />
                    <Route path="/content" exact element={<Content />} />
                    <Route path="/bankinformation" exact element={<SetupBankList />} />
                    <Route path="*" exact element={<NotFound />} />
                </Route>
            </Routes>
        )
    }

    const AdminRoutes = () => {
        return (
            <Routes message="" >

                <Route path="/" exact element={<Dashboard />} />
                <Route path="/content" exact element={<Content />} />
                <Route path="/signin" exact element={<Signin />} />
                <Route path="/signout" exact element={<Signout />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        )
    }



    return (
        <Router>
            <Routing>
                <BankInformationRoutes />
                {/*<Routes message="" >
                          <Route path="/streams/new" exact element={<StreamCreate />} />
                <Route path="/streams/delete/:id" exact element={<StreamDelete />} />
                <Route path="/streams/edit/:id" exact element={<StreamEdit />} />
                <Route path="/streams/show" exact element={<StreamShow />} /> 
                    <Route path="/" exact element={<Dashboard />} />
                    <Route path="/content" exact element={<Content />} />
                    <Route path="/signin" exact element={<Signin />} />
                    <Route path="*" element={<NotFound />} />
                    {<BankInformationRoutes />}
                </Routes>*/}
                {/* {
                    (() => {
                        if (!state.authenticated) {
                            console.log('unauthorized')

                            return <UnAuthorized />
                        } else {
                            if (idx === 1) {
                                console.log('here')
                                return <BankInformationRoutes />

                            }
                            else {
                                return <AdminRoutes />
                            }
                        }
                    })()
                } */}
            </Routing>
        </Router>
    )
}

const mapStateToProps = (state) => {

    return { authenticated: state.auth.authenticated }
}


export default connect(mapStateToProps)(App)