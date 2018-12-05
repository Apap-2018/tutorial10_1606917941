import React from 'react';

export const DaftarStaffRow = (props) => {
    return (
        <tbody>
            {props.listStaff.map(staff => {
                return (
                    <tr key={staff.id}>
                        <td>{staff.nama}</td>
                        <td>{staff.jenis}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}