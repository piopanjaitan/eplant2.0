import React from "react";
import { Table, Grid, Container, Header, Segment, Breadcrumb, Button } from "semantic-ui-react";
import ContentHeader from "./ContentHeader";
import { Link } from 'react-router-dom'
import Content from "./Content";

/*=============================================================================
 |       Author:  Gunadi Rismananda
 |         Dept:  IT - USTP
 |          
 |  Description:  Template Content Application
 |                Enclosed within ContentHeader element                 
 |                Parent Value & Components : 
 |                          - Title           (String)
 |                          - Button New Data (Function)
 |
 *===========================================================================*/

const TemplateContent = () => {

    const addClickHandler = () => {
        console.log('button clicked')
    }

    return (
        <ContentHeader
            title="Template Content"
            addClickHandler={addClickHandler}>
            <Grid.Row /* style={{ overflowX: 'scroll' }} */>
                <Grid.Column stretched >
                    <Table
                        attached="top"
                        collapsing celled >
                        <Table.Header>
                            <Table.HeaderCell>Header</Table.HeaderCell>
                            <Table.HeaderCell>Header</Table.HeaderCell>
                            <Table.HeaderCell>Header</Table.HeaderCell>
                            <Table.HeaderCell>Header</Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>

                            </Table.Row>
                            <Table.Row>

                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                            </Table.Row>
                            <Table.Row>

                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
        </ContentHeader>

    )
}

export default TemplateContent