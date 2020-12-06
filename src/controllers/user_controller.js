import axios from 'axios';
import config from '../config';

function signup( userData, callback ) {
  // let userData = { firstName, lastName, email, password, address, telephoneNumber, position, company };
  axios.post(config.api.signup, userData)
  .then( (res) => {
    callback(res.status, res.data)
  })
  .catch( (error) => {
    console.log(error)
    if(error.response)
      callback(error.response.status, false)
    else 
      callback(false)
  })
}

function login(email, password, callback) {
  axios.post(config.api.login, { email, password })
  .then((res) => {
    console.log(res);
    callback(res.status, res.data);
  })
  .catch((error) => {
    console.log(error);
    if(error.response)
      callback(error.response.status, false)
    else 
      callback(false)
  })
}

function validateToken(token, callback) {
  callback(true)
}

export {
  signup,
  login,
  validateToken
}