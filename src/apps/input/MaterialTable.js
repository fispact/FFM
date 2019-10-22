import React from 'react';
import ReactTable from "react-table";

import "react-table/react-table.css";

function MaterialTable(props){

    const columns = [{
        Header: 'Element',
        accessor: 'element', // String-based value accessors!,
    }, {
        Header: 'Mass percentage (%)',
        accessor: 'value',
        Cell: props.renderElementEditable
    }];

    return (
        <div 
            style={{
            width: "100%",
            height: "98%",
            margin: "auto",
            backgroundColor: "#e8eaec",
            borderRadius: "2px",
            fontSize: "14px",
            color: "#011"
        }}>
            <ReactTable
            data={props.data}
            columns={columns}
            defaultPageSize={5}
            className="-striped -highlight"
            />
        </div>
    );
}

export {MaterialTable}