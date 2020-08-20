import React from 'react';
import ApiCall from '../../utils/ApiCall';

class SunRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: [],
      HistoryClients: []
    }
  }
  componentDidMount() {
    ApiCall('https://api.meraki.com/api/v1/networks/L_566327653141843049/clients?timespan=3600&perPage=300', 'GET', null).then(res => {
      this.setState({
        clients: res.data
      })
      return (
        ApiCall('https://api.meraki.com/api/v1/devices/Q2EK-UKGM-XSD9/clients?timespan=2592000', 'GET', null).then(res => {
          this.setState({
            HistoryClients: res.data
          })
        })
      )

    }).catch(err => {
      console.log(err)
    })
  }
  showCurrentClient(clients) {
    var result = null;
    if (clients.length > 0) {
        var stt=0;
      result = clients.map((client, index) => {
        if (client.status == "Online" && client.recentDeviceSerial == "Q2EK-UKGM-XSD9") {
        //   const x = Math.round(((client.usage.recv + client.usage.sent) / 1024) * 100) / 100
        //   var usage = (x < 1024) ? usage = x + ' Mb' : usage = Math.round((x / 1024) * 100) / 100 + ' Gb';
          return (
            <tr>
              <th scope="row">{stt+=1}</th>
              <td>{client.description}</td>
              <td>{client.mac}</td>
              <td>{client.usage.sent}</td>
              <td>{client.mac}</td>
            </tr>

          )
        }
      })
    }
    return result;

  }
  showNowClient(historyclients) {
    var result = null;
    if (historyclients.length > 0) {
      result = historyclients.map((historyclient, index) => {

        const x = Math.round(((historyclient.usage.recv + historyclient.usage.sent) / 1024) * 100) / 100
        var usage = (x < 1024) ? usage = x + ' Mb' : usage = Math.round((x / 1024) * 100) / 100 + ' Gb';
        return (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{historyclient.description}</td>
            <td>{historyclient.mac}</td>
            <td>{usage}</td>
            <td>{historyclient.ip}</td>
          </tr>

        )

      })
    }
    return result;
  }
  render() {
    var { clients, HistoryClients } = this.state;
    return (
      <div>
        <p>Current Client: {this.props.serial} </p>
        <table class="table border">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col">MAC address</th>
              <th scope="col">Usage</th>
              <th scope="col">IPv4 address</th>
            </tr>
          </thead>
          <tbody>
            {this.showCurrentClient(clients)}
          </tbody>
        </table>
        <p>History Client</p>
        <table class="table border">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col">MAC address</th>
              <th scope="col">Usage</th>
              <th scope="col">IPv4 address</th>
            </tr>
          </thead>
          <tbody>
            {this.showNowClient(HistoryClients)}
          </tbody>
        </table>

      </div>
    )
  }
}
export default SunRoom;