import React, { Component } from 'react'

export default class UserRecords extends Component {
    render() {
        return (
            <div className="userRecords">
                <h2> My Land Assets</h2>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Plot ID</th>
                        <th scope="col">Area Code</th>
                        <th scope="col">Length</th>
                        <th scope="col">Breadth</th>
                        <th scope="col">Total Area</th>
                        <th scope="col">Price</th>
                        <th scope="col">Approve status</th>
                        <th scope="col">Sale Status</th>
                        <th scope="col">Sale Option</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.props.landrecords.map((land,key)=>{
                            
                            if(land.currentOwner==this.props.account)
                            return(
                                
                                <tr key={key}>
                                <th scope="row">{land.plotId.toString()}</th>
                                <th scope="row">{land.areaCode.toString()}</th>
                                <th scope="row">{land.length.toString()}</th>
                                <th scope="row">{land.breadth.toString()}</th>
                                <th scope="row">{(land.length*land.breadth).toString()}</th>
                                <td>{window.web3.utils.fromWei(land.price.toString(), 'Ether')} Eth</td>
                                <td>{this.props.verificationStatus[land.vs]}</td>
                            {/* <td>{product.vs}</td> */}
                            <td s>{land.forsale?<th scope="row">For Sale</th>:
                            
                            <th scope="row">Not for Sale</th> 
                            }</td>
                                <td>
                                    { land.forsale
                                    ? <button
                                        name={land.plotId}
                                    
                                        onClick={(event) => {
                                            this.props.landNotForSale(event.target.name)
                                        }}
                                        >
                                        End Sale
                                        </button>
                                    : <button
                                    name={land.plotId}
                                    
                                    onClick={(event) => {
                                        this.props.landForSale(event.target.name)
                                    }}
                                    >
                                    Put for sale
                                    </button>
                                    }
                                 </td>

                            </tr>

                            )
                            
                        })}
                    </tbody>

                </table>

                
            </div>
        )
    }
}
