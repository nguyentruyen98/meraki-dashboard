import React from 'react';
import './css/style.css';
import OneStFloorAP from './AccessPoint/1stFloorAP';
import OfficeAp from './AccessPoint/OfficeAp';
import TowFloorAp from './AccessPoint/2FloorAp';
import ApiCall from '../utils/ApiCall';
import SunRoom from './AccessPoint/SunRoom';
import BaseAP from './AccessPoint/BaseAP';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
class AccessPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accesspoint: [],
      accesspointDetail: [],
      serial:'hehe'

    }
  }
  showAccessPoint(accesspoints, accesspointDetails) {
    // var result, resultt = null;
    // if (accesspoints.length > 0) {
    //   accesspoints.map((accesspoint, index) => {
    //     if (accesspoint.model.slice(0, 2) == "MR") {
    //       resultt= accesspointDetails.map((accesspointDetail, indexx) => {
    //         if (accesspointDetails.length > 0) {
    //           if (accesspointDetail.serial == accesspoint.serial) {
    //             console.log(accesspointDetail.serial, accesspoint.serial)
    //             return (
    //               <tr >
    //                 <th scope="row">{index + 1}</th>
    //                 <td>On</td>
    //                 <td>{accesspoint.name}</td>
    //                 <td>{accesspoint.mac}</td>
    //                 <td>{accesspoint.model}</td>
    //                 <td>{accesspoint.lanIp}</td>
    //                 <td>{accesspointDetail.publicIp}</td>
    //                 <td>{accesspoint.serial}</td>
    //               </tr>
    //             )
    //           }
    //         }
    //       })
    //     }
    //   })
    // }
    // console.log('asds', resultt)
    // return resultt;
    var result = null;
    if (accesspoints.length > 0) {
      result = accesspoints.map((accesspoint, index) => {
        if (accesspoint.model.slice(0, 2) == "MR") {
          var line = index % 2 === 0 ? line = "line" : line = '';
          var x = accesspoint.serial;
          var url = '/'+x; 
          return (
            <tr id={line}>
              <th scope="row">{index + 1}</th>
              <td><span className="dot online"></span></td>
              <Link to={url}><td id="name">{accesspoint.name}</td></Link>
              <td>{accesspoint.mac}</td>
              <td>{accesspoint.model}</td>
              <td>{accesspoint.lanIp}</td>
              <td>{accesspoint.serial}</td>
            </tr>
          )
        }
      })
    }
    return result;
  }
  componentDidMount() {
    ApiCall('https://api.meraki.com/api/v1/networks/L_566327653141843049/devices', 'GET', null).then(res => {
      this.setState({
        accesspoint: res.data
      })
      console.log(this.state.accesspoint)

      return ApiCall('https://api.meraki.com/api/v1/organizations/681155/devices/statuses', 'GET', null).then(res => {
        this.setState({
          accesspointDetail: res.data
        })
        console.log(this.state.accesspointDetail)

      })
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
        accesspoint: res.data
      })
      console.log(this.state.accesspoint)

      return ApiCall('https://api.meraki.com/api/v1/organizations/681155/devices/statuses', 'GET', null).then(res => {
        this.setState({
          accesspointDetail: res.data
        })
        console.log(this.state.accesspointDetail)

      })
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    var { accesspoint, accesspointDetail } = this.state;
    if (accesspoint[0] != null && accesspointDetail[0] != null) {
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
              <span>ONLINE: 5</span>
            </div>
            <div className="title">
              <span className="dot dormant"></span>
              <span>REPEATERS:0</span>
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
                <th scope="col">Local IP</th>
                <th scope="col">Serial number</th>
              </tr>
            </thead>
            <tbody>
              {this.showAccessPoint(accesspoint, accesspointDetail)}
          </tbody>
          </table>
        </div>
        <Switch>
          <Route path="/Q2LD-GYL3-KEHX"><OneStFloorAP serial="Q2LD-GYL3-KEHX"/></Route>
          <Route path="/Q2LD-ZWCZ-UA77"><OfficeAp serial="Q2LD-ZWCZ-UA77"/></Route>
          <Route path="/Q2LD-AN9B-S6AJ"><TowFloorAp serial="Q2LD-AN9B-S6AJ"/></Route>
          <Route path="/Q2EK-UKGM-XSD9"><SunRoom serial="Q2EK-UKGM-XSD9"/></Route>
          <Route path="/Q2LD-3Y7V-7Y2X"><BaseAP serial="Q2LD-3Y7V-7Y2X"/></Route>

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
              <span>REPEATERS:0</span>
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
            <th scope="col">Local IP</th>
            <th scope="col">GateWave</th>
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
export default AccessPoint;
