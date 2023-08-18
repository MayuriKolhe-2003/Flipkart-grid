import React from 'react';


function ChartRow1(props){
    const approveUser = ()=>{

    }

    return (
                <tr>
                    <td>{props._id}</td>
                    <td>{props.userwallet}</td>
                    <td>{props.coins}</td>
                    <td>
                        <button style={{border:'none',backgroundColor:'red',color:'white',padding:'5px',width:'100px'}} 
                        onClick={approveUser}>
                            Approve
                        </button>

                    </td>
                    
                    
                    
                    
                </tr>
            )
    }
    
        

export default ChartRow1;