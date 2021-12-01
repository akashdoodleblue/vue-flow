import * as axios from 'axios';

const BASE_URL = 'http://localhost:3000';


export function getScreens(){
   return axios.get(BASE_URL + '/screen/get').then(res => {
        console.log(res)
        let data = res.data.map((e, index) => {
        let picture64Bit = btoa(String.fromCharCode(...new Uint8Array(e.img.data.data)));
        e.img = 'data:image/jpg;base64,' + picture64Bit
         
        return e
        })
        return data
      }).catch(err => {
        throw new Error(err)
      })
}