const base = "http://localhost:5000";
const config = {
  base: base,
  api: {
    login: `${base}/api/user/login`,
    signup: `${base}/api/user/signup`,
    beneficiaryCreate: `${base}/api/beneficiary/add`,
    beneficiaryGet: `${base}/api/beneficiary`,
  }
}




// const config = {
//   // base: ,
//   api: {
//     login: `/api/user/login`,
//     signup: `/api/user/signup`,
//     beneficiaryCreate: `/api/beneficiary/add`,
//     beneficiaryGet: `/api/beneficiary`,
//   }
// }

export default config;