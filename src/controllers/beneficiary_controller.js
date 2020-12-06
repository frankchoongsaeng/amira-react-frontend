import axios from 'axios';
import config from '../config';

export function createBeneficiary(_benefciary_data, callback) {

  // make an api request to save the data 
  axios.post(config.api.beneficiaryCreate, _benefciary_data)
    .then((res) => {
      callback(res.status, res.data)
    })
    .catch((error) => {
      console.log(error)
      if (error.response)
        callback(error.response.status, false)
      else
        callback(false)
    })

}




export function getAllBeneficiaries(callback) {

  let headers = {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role")
  }

  // make an api request to get all beneficiaries 
  axios.get(config.api.beneficiaryGet, { headers: headers })
    .then((res) => {
      callback(res.status, res.data)
    })
    .catch((error) => {
      console.log(error)
      if (error.response)
        callback(error.response.status, false)
      else
        callback(false)
    })

}



/**
 *
 * ==================
 * ================== HELPER FUNCTIONS DOWN HERE
 * ==================
**/
