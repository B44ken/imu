import React, { useEffect } from 'react'

import './DataTable.css'

const DataTable = ({ data, length }) => {
    const fields = ['t', 'gyro_x', 'gyro_y', 'gyro_z']

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
                                return <td key={j}>{data[field]}</td>
                            })}
                        </tr>
                    })
                } 
            </tbody>
        </table>
    </div>
} 

export { DataTable }