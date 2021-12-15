import React from "react";
import { Container, Header, Segment, Breadcrumb, Grid, Button, Divider } from "semantic-ui-react";
import { Link, useLocation } from 'react-router-dom'

const ContentHeader = ({ children, title, btn1 }) => {


    const location = useLocation();
    //console.log(location.);

    return (
        <div >
            <Header size="huge"
                as={Segment} basic
                style={{ paddingTop: '40px', paddingBottom: '5px' }}
                content={title} />
            <Divider style={{ marginLeft: '10px', marginRight: '280px' }} />
            <Container as={Segment} basic
                style={{ width: 'auto', marginTop: '10px', marginRight: '100px' }}>
                <Grid style={{ marginRight: '200px' }}>
                    <Grid.Row>
                        <Grid.Column >
                            <Breadcrumb>
                                <Breadcrumb.Section as={Link} link to="/">Home</Breadcrumb.Section>
                                <Breadcrumb.Divider />
                                <Breadcrumb.Section active>{location.pathname}</Breadcrumb.Section>
                            </Breadcrumb>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                        <Button
                            positive
                            icon={btn1.btnIcon}
                            className="btnControlAdd"
                            style={{ marginLeft: '10px' }}
                            content={btn1.btnLabel}
                            floated="left"
                            onClick={btn1.addClickHandler}
                            size="small" />
                    </Grid.Row>
                    <Grid.Row style={{ innerHeight: '100%' }} >
                        {children}
                    </Grid.Row>
                </Grid>
            </Container>
        </div >)
}

export default ContentHeader