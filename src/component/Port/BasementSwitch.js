import React from 'react';
import '../css/style.css';
import ApiCall from './../../utils/ApiCall';
class BasementSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      port: []
    }
  }
  componentDidMount() {
    ApiCall('https://api.meraki.com/api/v1/devices/Q2HP-225A-XA5C/clients', 'GET', null).then(res => {
      this.setState({
        port: res.data
      });
      console.log(this.state.port)
    }).catch(err => {
      console.log(err)
    })
  }
  showPort(ports) {
    var result = null;
    if (ports.length > 0) {
      result = ports.map((port, index) => {
        const x = Math.round(((port.usage.recv + port.usage.sent) / 1024) * 100) / 100
        var usage = (x < 1024) ? usage = x + ' Mb' : usage = Math.round((x / 1024) * 100) / 100 + ' Gb';
        var line = index % 2 === 1 ? line = "line" : line = '';
        if (port.description != null) {
          return (
            <tr id={line}>
              <th scope="row">{index + 1}</th>
              <td id='name'>{port.description}</td>
              <td>{usage}</td>
              <td>{port.mac}</td>
              <td>{port.ip}</td>
              <td>{port.vlan}</td>
              <td>{port.switchport}</td>
            </tr>
          )
        }
      })
    }
    return result;
  }
  render() {
    var { port } = this.state;
    return (
      <table className="table border">
        <thead id="green">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Usage</th>
            <th scope="col">MAC address</th>
            <th scope="col">IP address</th>
            <th scope="col">VLAN</th>
            <th scope="col">Port</th>
          </tr>
        </thead>
        <tbody>
          {this.showPort(port)}
        </tbody>
      </table>
    )
  }
}
export default BasementSwitch;