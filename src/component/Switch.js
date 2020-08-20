import React from 'react';
import './css/style.css'
import ApiCall from '../utils/ApiCall';
import Child from './Child';
import BigOfficeSwitch from './Port/BigOfficeSwitch';
import BasementSwitch from './Port/BasementSwitch';
import BedroomSwitch from './Port/BedroomSwitch';
import Port from './Port/Port';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
class Switch1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchs: [],
      switt: []
    }
  }
  componentDidMount() {
    ApiCall('https://api.meraki.com/api/v1/networks/L_566327653141843049/devices', 'GET', null).then(res => {
      this.setState({
        switchs: res.data
      });
      // console.log('swithc', res.data);
      // return SwitchApi('https://api.meraki.com/api/v1/networks/L_566327653141843049/clients?timespan=86400&perPage=100', 'GET', null).then(res => {
      //   this.setState({
      //     switt: res.data
      //   })
      //   // console.log('switt', res.data);

      // })
    }).catch(err => {
      console.log(err)
    })
    setInterval(
      () => this.get(),
      1000*5*60
    );
  }
  get(){
    ApiCall('https://api.meraki.com/api/v1/networks/L_566327653141843049/devices', 'GET', null).then(res => {
      this.setState({
        switchs: res.data
      });
    }).catch(err => {
      console.log(err)
    })
  }
  showSwitchDevices(switchs) {
    var result = null;

    if (switchs.length > 0) {
      result = switchs.map((swit, index) => {
        if (swit.model.slice(0, 2) == "MS") {
          var line = index % 2 === 0 ? line = "line" : line = '';
          var x = swit.serial;
          var url = '/'+x; 
          console.log(url)
          return (
              <tr id={line}>
                <th scope="row">{index - 5}</th>
                <td><span className="dot online"></span></td>
                <Link to={url} ><td id="name">{swit.name}</td></Link>
                <td>{swit.mac}</td>
                <td>{swit.model}</td>
                <td>MS 12.14</td>
                <td>{swit.lanIp}</td>
                <td>{swit.serial}</td>
              </tr>
          )
        }

      })
    }
    return result;
  }
  render() {
    var { switchs } = this.state;
    var url = '/'+switchs.serial
    if (switchs[0] != null) {
      return (
        <Router>
          <div>
          <div className="header">
            <div className="title">
              <span className="dot offline"></span>
              <span>OFFLINE: 0</span>
            </div>
            <div className="title">
              <span className="dot hihi"></span>
              <span>ALERTING: 0</span>
            </div>
            <div className="title">
              <span className="dot online"></span>
              <span>ONLINE: 3</span>
            </div>
            <div className="title">
              <span className="dot dormant"></span>
              <span>DORMANT:0</span>
            </div>
          </div>
          <table className="table border">
            <thead id="green">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status</th>
                <th scope="col">Name</th>
                <th scope="col">MAC address</th>
                <th scope="col">Model</th>
                <th scope="col">Firmware version</th>
                <th scope="col">Local IP</th>
                <th scope="col">Serial number</th>
              </tr>
            </thead>
            <tbody>
              {this.showSwitchDevices(switchs)}
            </tbody>
          </table>
        </div>
        <Switch>
          <Route path="/Q2QW-W2W4-MCNR"><BigOfficeSwitch/> </Route>
          <Route path="/Q2HP-WEUW-2PQD"><BedroomSwitch/> </Route>
          <Route path="/Q2HP-225A-XA5C"><BasementSwitch/> </Route>
          {/* <Route path="/:id" children={<Child />} /> */}
        </Switch>
        </Router>
      )
    }
    return (
      <div>
        <div className="header">
          <div className="title">
            <span className="dot offline"></span>
            <span>OFFLINE: 0</span>
          </div>
          <div className="title">
            <span className="dot hihi"></span>
            <span>ALERTING: 0</span>
          </div>
          <div className="title">
            <span className="dot online"></span>
            <span>ONLINE: 0</span>
          </div>
          <div className="title">
            <span className="dot dormant"></span>
            <span>DORMANT:0</span>
          </div>
        </div>
        <table className="table border">
          <thead id="green">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Status</th>
              <th scope="col">Name</th>
              <th scope="col">MAC address</th>
              <th scope="col">Model</th>
              <th scope="col">Firmware version</th>
              <th scope="col">Local IP</th>
              <th scope="col">Serial number</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    )
  }
}
export default Switch1;