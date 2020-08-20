import React from 'react';
import './css/style.css';
import ApiCall from '../utils/ApiCall';
class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameras: []
    }
  }
  showCameras(cameras) {
    var result = null;
    if (cameras.length>0)
    {
      result = cameras.map((camera, index) => {
        if (camera.model.slice(0, 2) == "MV") {
          var line = index % 2 === 1 ? line = "line" : line = ''
          return (
            <tr id={line}>
              <th scope="row">{index -8}</th>
              <td><span className="dot online"></span></td>
              <td id="name">{camera.mac}</td>
              <td>{camera.mac}</td>
              <td>{camera.model}</td>
              <td>{camera.lanIp}</td>
              <td>{camera.serial}</td>
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
        cameras: res.data
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
        cameras: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    var { cameras } = this.state;
    if (cameras[0] != null) {
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
              <span>ONLINE: 1</span>
            </div>
            <div className="title">
              <span className="dot dormant"></span>
              <span>REPEATERS: 0</span>
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
              {this.showCameras(cameras)}
          </tbody>
          </table>
        </div>
      )
    }
    return(
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
export default Camera