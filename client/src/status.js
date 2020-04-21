import React, { Component } from "react";

class Status extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isFetching: false,
      attributes: []
    }
  }

  componentDidMount() {
    this.setState({ ...this.state, isFetching: true });
    fetch('http://localhost:9000/invorderingen')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            ...this.state,
            isFetching: false,
            attributes: result.invorderingen
          });
        },
        // error handler
        (error) => {
          this.setState({
            ...this.state,
            isFetching: false,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="Status">
        <p className="Status invorderingen">Status invordering(en)</p>
        <p>{this.state.isFetching ? (
          <span>Fetching records</span>
        ) : (
            <span>
              {this.state.attributes.map((item, i) => {
                return <li key={i}>{item.beslaglegger} - {item.beslagvrije_voet}</li>
              })}
            </span>

          )
        }</p>
      </div>
    )
  }
}

export default Status;