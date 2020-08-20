import axios from 'axios';
export default function SwitchApi(url,method='GET',body){
    return axios({
        method:method,
        data:body,
        url:url,
        headers: {'X-Cisco-Meraki-API-Key': '4e57f41befad1ec4fb0fc45a382a426f7be4a176'}
    }).catch(err=>{

    });

}