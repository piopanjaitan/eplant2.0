import React, { useState, useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import * as actions from '../../redux/actions'
import { connect, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { Container, Grid, Header, Image, Form as FormUI, Button, Segment, Message } from 'semantic-ui-react'
import './SigninStyle.css'

const Signin = (state) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [date, setDate] = useState();

    const [passwordShown, setPasswordShown] = useState(false);


    /*   const initialFormData = Object.freeze({
          loginid: "",
          password: "",
          site: ""
      }) */

    const togglePasswordVisiblity = (e) => {
        setPasswordShown(!passwordShown);
    };


    /*  const handleChange = (e) => {
         updateFormData({
             ...formData,
 
             // Trimming any whitespace
             [e.target.name]: e.target.value.trim()
         });
     };
  */
    const renderError = ({ error, touched }) => {

        console.log(`touched ${touched}`)

        if (touched && error) {
            return (
                <Message error floating size="mini">
                    <Message.Header>{error}</Message.Header>
                </Message>
            );
        }
    };

    const handleSubmits = (values) => {


        console.log(values)
        //        const formpost = { email: formData.email, password: formData.password }

        dispatch(actions.signin(values, () => {
            navigate('/')
        }))


        /*         dispatch(actions.signin(formpost, () => {
                    navigate('/')
                }))
         */        // ... submit to API or something
    };




    const renderInput = ({ input, label, meta, inputtype }) => {
        const className = `field ${meta.error && meta.touched ? "error" : ""}`

        let inputClass

        inputClass = `ui input align item center`

        //        if (inputtype === 'password')
        //          inputClass = `ui icon input`

        const renderIcon = (inputtype) => {
            if (inputtype !== 'password')
                return null;
            return (
                <i style={{ marginTop: '0.5em', marginLeft: '0.2em' }} className={`ui ${passwordShown ? 'green' : 'grey'} eye icon `} onClick={togglePasswordVisiblity}></i>
            )
        }

        return (
            <div className={className}>
                <label>{label}</label>
                <div className={inputClass}>
                    <input {...input} autoComplete="off" type={`${passwordShown || (inputtype === 'text') ? "text" : "password"}`} />
                    {renderIcon(inputtype)}
                </div>
                {renderError(meta)}
            </div>
        );
    };

    const renderInputUi = ({ input, label, meta, inputtype }) => {
        const className = `field ${meta.error && meta.touched ? "error" : ""}`

        let inputClass

        inputClass = `ui input align item center`

        //        if (inputtype === 'password')
        //          inputClass = `ui icon input`

        const renderIcon = (inputtype) => {
            if (inputtype !== 'password')
                return null;
            return (
                <i style={{ marginTop: '0.5em', marginLeft: '0.2em' }} className={`ui ${passwordShown ? 'green' : 'grey'} eye icon `} onClick={togglePasswordVisiblity}></i>
            )
        }

        return (
            <div className={className}>
                <FormUI.Field>
                    <label>{label}</label>
                    <div className={inputClass}>
                        <input {...input} autoComplete="off" type={`${passwordShown || (inputtype === 'text') ? "text" : "password"}`} />
                        {renderIcon(inputtype)}
                    </div>
                </FormUI.Field>
                {renderError(meta)}
            </div>
        );
    };

    const renderSelect = ({ input, label, meta }) => {

        const className = `field dropdown ${meta.error && meta.touched ? "error" : ""}`

        return (
            <>
                <div className={className}>
                    <label>{label}</label>
                    <select {...input} >
                        <option />
                        {['GCM', 'SMG', 'SLM', 'SBE', 'SJE'].map(user => {
                            return <option key={user}>{user}</option>;
                        })}
                    </select>
                    {renderError(meta)}

                </div>
            </>
        )
    };

    useEffect(() => {
        setDate(new Date().getFullYear())
    }, [])


    return (
        <Container fluid style={{ backgroundColor: 'gainsboro', height: '100vh', padding: '100px' }} >
            <Grid centered >
                <Grid.Row>
                    <Header size="huge" as={Grid.Column} textAlign="center">
                        <Image circular src='/ustp_logo.png' verticalAlign='middle' />
                        ePlantation Login
                    </Header>
                </Grid.Row>
                <Grid.Row>
                    <Form
                        onSubmit={handleSubmits}
                        validate={(formValues) => {
                            const errors = {};

                            if (!formValues.loginid) {
                                errors.loginid = "User ID Tidak Boleh Kosong";
                            }

                            if (!formValues.password) {
                                errors.password = "Password Tidak Boleh Kosong";
                            }

                            if (!formValues.site) {
                                errors.site = "Site Tidak Boleh Kosong";
                            }

                            return errors;
                        }}

                        render={({ handleSubmit }) => (
                            <FormUI as={Segment} raised
                                style={{ width: '600px', backgroundColor: 'whitesomke' }}>
                                <form
                                    onSubmit={handleSubmit}
                                    className="ui larger form error">
                                    <Field
                                        name="loginid"
                                        component={renderInputUi}
                                        label="User ID"
                                        inputtype="text"
                                    />
                                    <Field
                                        name="password"
                                        component={renderInput}
                                        label="Password"
                                        inputtype="password"
                                    />
                                    <Field name="site"
                                        label="Site"
                                        component={renderSelect} />

                                    <Button
                                        primary
                                        style={{ width: '200px' }}
                                        type='submit'
                                        content="Login" />
                                </form>
                            </FormUI>
                        )}
                    />
                </Grid.Row>
                <Grid.Row>
                    <Header style={{ marginTop: '-20px' }} size="small" as={Grid.Column} textAlign="center"
                        content={`© PT. Union Sampoerna Triputra Persada - ${date}`} />
                </Grid.Row>
            </Grid>
        </Container >
    )
}


const mapStateToProps = (state) => {
    return { errorMessage: state.auth.errorMessage }
}

export default (connect(mapStateToProps, actions))(Signin)


