import React, { Component } from 'react'

export default class AllRecords extends Component {
    render() {
        return (
            <div className="allRecords">
                <h2>All Land Records</h2>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Plot ID</th>
                        <th scope="col">Area Code</th>
                        <th scope="col">Length</th>
                        <th scope="col">Breadth</th>
                        <th scope="col">Total Area</th>
                        <th scope="col">Price</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Address</th>
                        <th scope="col">Approve Status</th>                        
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.props.landrecords.map((land,key)=>{

                            return(
                                <tr key={key}>
                                    <th scope="row">{land.plotId.toString()}</th>
                                    <th scope="row">{land.areaCode.toString()}</th>
                                    <th scope="row">{land.length.toString()}</th>
                                    <th scope="row">{land.breadth.toString()}</th>
                                    <th scope="row">{(land.length*land.breadth).toString()}</th>
                                    <td>{window.web3.utils.fromWei((land.price).toString(), 'Ether')} Eth</td>
                                    <td>{land.currentOwner}</td>
                                    <td>{land.landAddress}</td>
                                    <td>{this.props.verificationStatus[land.vs]}</td>
                                    <td>
                                        { land.forsale
                                        ? <button
                                            className="btn btn-primary btn-block"
                                            name={land.plotId}
                                            value={land.price}
                                            onClick={(event) => {
                                                this.props.buyLand(event.target.name, event.target.value)
                                            }}
                                            >
                                            Buy
                                            </button>
                                        : <button disabled={true} className="btn btn-primary btn-block">Not For sale </button>
                                        }
                                     </td>
                                     <td>
                                        { land.forsale
                                        ? <button
                                            className="btn btn-primary btn-block"
                                            name={land.plotId}
                                            value={land.price}
                                            
                                            onClick={(event) => {
                                            
                                                this.props.buyLandWithoutEther(event.target.name, event.target.value)
                                            }}
                                            >
                                            Buy without Cryptocurrency
                                            </button>
                                        : <button disabled={true} className="btn btn-primary btn-block">Not For sale </button>
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
