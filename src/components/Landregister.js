import React, { Component } from 'react'

export default class Landregister extends Component {
    render() {
        return (
            <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
                <h2>Register Your Land</h2>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const areaCode = this.areaCode.value
                  const length = this.length.value
                  const breadth = this.breadth.value
                  const landAddress = this.landAddress.value
                  const price=window.web3.utils.toWei(this.price.value.toString(), 'Ether')
                  this.props.createLandRecord(areaCode,length,breadth,landAddress,price)
                }}>
                <div className="form-group mr-sm-2">
                  <input
                    id="areaCode"
                    type="number"
                    ref={(input) => { this.areaCode = input }}
                    className="form-control"
                    placeholder="Enter Area Code"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="length"
                    type="number"
                    ref={(input) => { this.length = input }}
                    className="form-control"
                    placeholder="Enter Length Of Your Land"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="breadth"
                    type="number"
                    ref={(input) => { this.breadth = input }}
                    className="form-control"
                    placeholder="Enter Breadth Of Your Land"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="landAddress"
                    type="text"
                    ref={(input) => { this.landAddress = input }}
                    className="form-control"
                    placeholder="Enter Address Of Your Land"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="price"
                    type="text"
                    ref={(input) => { this.price = input }}
                    className="form-control"
                    placeholder="Enter Price Of Your Land"
                    required />
                </div>
                {/* <input type='file' accept="" onChange={this.props.captureFile} /> */}
             
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </form>
            </div>
          </main>
        </div>
      </div>
        )
    }
}
