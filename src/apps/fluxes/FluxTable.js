import React from 'react';
import ReactTable from "react-table";

import "react-table/react-table.css";

function FluxTable(props){

    const columns = [{
        Header: 'Lower Energy [eV]',
        accessor: 'lowerEnergy' // String-based value accessors!
    }, {
        Header: 'Upper Energy [eV]',
        accessor: 'upperEnergy' // String-based value accessors!
    }, {
        Header: 'Count [normalised units]',
        accessor: 'value',
        Cell: props.renderEditable
    }];

    return (
        <div 
            style={{
            width: "50%",
            height: "100%",
            margin: "auto",
            backgroundColor: "#ffffff",
            borderRadius: "2px",
            fontSize: "14px",
            color: "#011"
        }}>
            <ReactTable
            data={props.data}
            columns={columns}
            defaultPageSize={10}
            className="-striped -highlight"
            />
        </div>
    );
}

export {FluxTable}