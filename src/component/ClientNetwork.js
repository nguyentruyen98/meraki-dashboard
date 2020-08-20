import React from 'react';
import ApiCall from './../utils/ApiCall';
import '../component/css/style.css';
class ClientNetwork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
    }
  }
  componentDidMount() {
    ApiCall('https://api.meraki.com/api/v1/networks/L_566327653141843049/clients?timespan=86400&perPage=100', 'GET', null).then(res => {
      this.setState({

        clients: res.data
      })
      console.log(this.state.clients)
    }).catch(err => {
      console.log(err)
    })
    setInterval(
      () => this.get(),
      1000*5*60
    );
  }
  get(){
    ApiCall('https://api.meraki.com/api/v1/networks/L_566327653141843049/clients?timespan=86400&perPage=100', 'GET', null).then(res => {
      this.setState({

        clients: res.data
      })
      console.log(this.state.clients)
    }).catch(err => {
      console.log(err)
    })
  }
  showClient(clients) {
    var result = null;
    if (clients.length > 0) {
      result = clients.map((client, index) => {
        const x = Math.round(((client.usage.recv + client.usage.sent) / 1024) * 100) / 100
        var usage = (x < 1024) ? usage = x + ' Mb' : usage = Math.round((x / 1024) * 100) / 100 + ' Gb';
        var line = index % 2 === 1 ? line = "line" : line = '';
        console.log(client.status, client.switchport)
        var image = null;
        if (client.status == "Online" && client.switchport != null) {
          image = "mks-cli-wired-on";
        }
        else if (client.status == "Offline" && client.switchport != null) {
          image = "mks-cli-wired-off";
        }
        else if (client.status == "Online" && client.switchport == null) {
          var image = null;
          image = "mks-cli-wireless-on";
        }
        else if (client.status == "Offline" && client.switchport == null) {
          var image = null;
          image = "mks-cli-wireless-off";
        }
        return (
          <tr id={line}>
            <th scope="row">{index + 1}</th>
            <td id={image}></td>
            <td id="name">{client.description}</td>
            <td>{client.lastSeen}</td>
            <td>{usage}</td>
            <td>{client.ip}</td>
            <td>{client.mac}</td>
            <td>{client.os}</td>
            <td>{client.recentDeviceName}</td>
          </tr>
        )
      })
    }
    return result;
  }
  showTotalUsage = (clients) => {
    var result = 0;
    if (clients.length > 0) {
      clients.map((client) => {
        result = result + client.usage.recv + client.usage.sent
      })
    }
    return result;
  }
  showClientOnline = (clients) => {
    var result = 0;
    if (clients.length > 0) {
      clients.map((client, index) => {
        if (client.status == "Online") {
          result += 1;
        }
      })
    }
    return result;
  }
  showClientOffline = (clients) => {
    var result = 0;
    if (clients.length > 0) {
      clients.map((client, index) => {
        if (client.status == "Offline") {
          result += 1;
        }
      })
    }
    return result;
  }

  render() {
    var { clients } = this.state;
    const x = Math.round((this.showTotalUsage(clients) / 1024) * 100) / 100
    var usage = (x < 1024) ? usage = x + ' Mb' : usage = Math.round((x / 1024) * 100) / 100 + ' Gb';
    if (clients[0] != null) {
      return (
        <div>
          <div className="header">
            <p className="title">Number Client: {clients.length}</p>
            <div className="title">
              <span className="dot online"></span>
              <span>Client Online: {this.showClientOnline(clients)}</span>
            </div>
            <div className="title">
              <span className="dot offline"></span>
              <span>Clinet Offline: {this.showClientOffline(clients)}</span>
            </div>
            <p className="title">Total Usage: {usage}</p>

          </div>
          <table className="table border">
            <thead id="green">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
                <th scope="col">Lastseen</th>
                <th scope="col">Usage</th>
                <th scope="col">IPv4 address</th>
                <th scope="col">MAC address</th>
                <th scope="col">Manufacture</th>
                <th scope="col">Connected to</th>
              </tr>
            </thead>
            <tbody>
              {this.showClient(clients)}
            </tbody>
          </table>
        </div>
      )
    }
    return (
      <div>
        <div className="header">
            <p className="title">Number Client: {clients.length}</p>
            <div className="title">
              <span className="dot online"></span>
              <span>Client Online: {this.showClientOnline(clients)}</span>
            </div>
            <div className="title">
              <span className="dot offline"></span>
              <span>Clinet Offline: {this.showClientOffline(clients)}</span>
            </div>
            <p className="title">Total Usage: {usage}</p>
          </div>
        <table className="table border">
          <thead id="green">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Status</th>
              <th scope="col">Description</th>
              <th scope="col">Lastseen</th>
              <th scope="col">Usage</th>
              <th scope="col">IPv4 address</th>
              <th scope="col">MAC address</th>
              <th scope="col">Manufacture</th>
              <th scope="col">Connected to</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    )

  }
}
export default ClientNetwork;