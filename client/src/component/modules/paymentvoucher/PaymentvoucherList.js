import React, { useEffect } from "react"
import ContentHeader from "../../templates/ContentHeader"
import { Grid, Button, Table, Input, Select, Container } from "semantic-ui-react"
import { connect, useDispatch } from 'react-redux'
import { useTable, usePagination } from 'react-table'

import { fetchBanks } from '../../../redux/actions'

/* import { fetchBanks } from "../../../redux/actions"; */

import requireAuth from "../../auth/requireAuth"


const addClickHandler = () => {
    console.log('button clicked')

}
const button = {
    btnLabel: 'Tambah Data Baru',
    btnIcon: 'pen square',
    addClickHandler
}

const SetupBankList = ({ banks }) => {


    const dispatch = useDispatch()

    const rowClickHandler = (row) => {
        console.log(row)
    }

    useEffect(() => {
        dispatch(fetchBanks())

    }, [dispatch])


    const columns = React.useMemo(
        () => [
            {
                Header: 'Bank Code',
                accessor: 'bankcode',
            },
            {
                Header: 'Bank Name',
                accessor: 'bankname',
            },
            {
                Header: 'Control Account',
                accessor: 'controlaccount',
            },
            {
                Header: 'Account Number',
                accessor: 'bankaccountcode',
            },
            {
                Header: 'Currency',
                accessor: 'currency',
            },
            {
                Header: 'Actions',
                accessor: 'progress',
                Cell: ({ cell: { row, value } }) => {
                    return (
                        <div style={{ textAlign: "center" }}>
                            <Button.Group size="mini">
                                <Button primary icon="edit" content="edit" labelPosition='left' onClick={() => rowClickHandler(row)} />
                                <Button.Or />
                                <Button negative icon="delete" content="delete" labelPosition='right' onClick={() => rowClickHandler(row)} />
                            </Button.Group>

                        </div>)
                }
            },

        ],
        []
    )


    const RenderTable = ({ columns, data }) => {
        console.log(data)
        // Use the state and functions returned from useTable to build your UI
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            page, // Instead of using 'rows', we'll use page,
            // which has only the rows for the active page

            // The rest of these things are super handy, too ;)
            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,
            state: { pageIndex, pageSize },
        } = useTable(
            {
                columns,
                data,
                initialState: { pageIndex: 2 },
            },
            usePagination
        )

        // Render the UI for your table
        return (
            <>
                <Container style={{ /* overflowY: 'scroll', display: 'block', */ paddingLeft: '10px', maxHeight: '550px', width: '100vw', paddingBottom: '5px' }}>
                    <Table compact striped sortable celled fixed singleLine
                        /*  style={{ paddingLeft: '5px', paddingRight: '5px' }} */
                        {...getTableProps()}
                    >
                        <Table.Header style={{ backgroundColor: 'gainsboro', position: 'sticky', top: '0', zIndex: '1' }}>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </Table.Header>
                        <Table.Body {...getTableBodyProps()} >
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </Container>
                {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
                <Container textAlign="center">
                    <Button.Group style={{ marginTop: '10px' }}>
                        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage} content="<<" />

                        <Button onClick={() => previousPage()} disabled={!canPreviousPage} content="<" />

                        <Button onClick={() => nextPage()} disabled={!canNextPage} content=">" />

                        <Button onClick={() => gotoPage((pageCount - 1))} disabled={!canNextPage} content=">>" />
                    </Button.Group>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page:{' '}
                        <Input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>{' '}
                    <Select
                        value={pageSize}
                        onChange={e => {
                            console.log('change ')
                            console.log(e.target.innerText)
                            console.log('changes ')
                            setPageSize(Number(e.target.innerText))
                        }}
                        options={[10, 20, 30, 40, 50].map(pageSize => ({ key: pageSize, value: pageSize, text: pageSize }))}
                    />
                </Container>
            </>
        )
    }

    if (banks.length === 0)
        return (<>loading</>)



    return (
        <ContentHeader
            title="Bank Information"
            btn1={button}>
            <RenderTable as={Grid.Column} columns={columns} data={banks} />
        </ContentHeader>
    )

}


const mapStateToProps = state => {
    return { banks: state.SetupBankList.banks }
}

export default
    requireAuth(connect(mapStateToProps, { fetchBanks })(SetupBankList))