import axios from '../../../adapters/axios';
import React from 'react';


function ChartRow1(props) {
    const approveUser = async (id) => {
        await axios.post("approve/add-approve", {
            userId: props.userwallet,
            Amount: props.coins
          });
        await axios.delete(`/seller/delbrand/${id}`);
    }
    // console.log(props);
    return (
        <tr>
            <td>{props.userid}</td>
            <td>{props.userwallet}</td>
            <td>{props.coins}</td>
            <td>
                <button style={{ border: 'none', backgroundColor: 'red', color: 'white', padding: '5px', width: '100px' }}
                    onClick={() => approveUser(props._id)}>
                    Approve
                </button>

            </td>




        </tr>
    )
}



export default ChartRow1;