import React, { useEffect } from 'react'

import './DataTable.css'

const DataTable = ({ data, length }) => {
    const fields = ['t', 'x', 'y', 'z']

    return <div className='hide-overflow'>
        <table className="table table-sm">
            <thead>
                <tr><th>time</th><th>x</th><th>y</th><th>z</th></tr>
            </thead>
            <tbody>
                {
                    data.map((data, i) => {
                        return <tr key={i}>
                            {fields.map((field, j) => {
                                return <td key={j}>{data[field].toPrecision(5)}</td>
                            })}
                        </tr>
                    })
                } 
            </tbody>
        </table>
    </div>
} 

export { DataTable }