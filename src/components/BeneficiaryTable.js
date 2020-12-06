import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import { getAllBeneficiaries } from '../controllers/beneficiary_controller';
import Container from './Container';
import NavBar from './NavBar';

const socket = io("http://localhost:5000", {
  reconnectionAttempts: 10,
});


function Table() {

  const [beneficiaryList, setBeneficiaryList] = useState([]);
  const isFieldAgent = useRef(false);
  const history = useHistory();



  // make the get request to get all user data 
  // that concerns the user
  const callGet = () => {
    getAllBeneficiaries((status, data) => {
      console.log(status);
      console.table(data);


      if (status === 200) {
        setBeneficiaryList(() => data.reverse())
      }

      else if (status === 500) {
        alert("Error completing action. server might be down");
      }

      else if (status === 408) {
        alert("An error occurred might be a request blocking configuration on your computer or a bad network");
      }

      else if (status === 403) {
        alert("Invalid header token. Try logging in again to validate your token");
      }

      else {
        alert("Could not send request, please check your network connection");
      }
    })
  }

  const dateFormatter = (date) => {
    let d = new Date(date.toString());
    // console.log(`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`);
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
  }

  const beneficiaryAddedHandler = beneficiaryData => {
    console.log(beneficiaryData)
    if (localStorage.getItem("role") !== "field agent") {
      setBeneficiaryList((bList) => [beneficiaryData, ...bList]);
    }
  }


  // set up socket.io listeners
  // *** have this run every time a state changes
  useEffect(() => {
    socket.on("beneficiaryAdded", beneficiaryAddedHandler);

    return (() => {
      socket.off("beneficiaryAdded", beneficiaryAddedHandler)
    })
  });

  // start init operations
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      return history.push("/");
    }
    // isFieldAgent.current is used to determine the current table view of the user.
    isFieldAgent.current = localStorage.getItem("role") === "field agent";

    callGet();

  }, [history])


  return (

    <div>
      <NavBar />
      <Container >
        <table className="table mt-5 mb-5 ">
          {/* TABLE TO BE DISPLAYED FOR NON-FIELD AGENTS */}
          {!isFieldAgent.current &&
            <>
              <thead>
                <tr>
                  <th scope="col">Officer Id</th>
                  <th scope="col">Last Modified</th>
                  <th scope="col">Beneficiary Name</th>
                  <th scope="col">Education</th>
                </tr>
              </thead>
              <tbody>

                {
                  beneficiaryList.map((beneficiary) => {
                    let date = dateFormatter(beneficiary.modified);
                    return (
                      <tr id={beneficiary._id} key={beneficiary._id}>
                        <td>{beneficiary.agentId}</td>
                        <td>{date}</td>
                        <td>{beneficiary.last_name + " " + beneficiary.first_name}</td>
                        <td>{beneficiary.education}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </>
          }

          {/* TABLE TO BE DISPLAYED FOR FIELD AGENTS */}
          {isFieldAgent.current &&
            <>
              <thead>
                <tr>
                  <th scope="col">Modified</th>
                  <th scope="col">Name</th>
                  <th scope="col">D.O.B </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>

                {
                  beneficiaryList.map((beneficiary) => {
                    let date = dateFormatter(beneficiary.modified);
                    return (
                      <tr id={beneficiary._id} key={beneficiary._id}>
                        <td>{date}</td>
                        <td>{beneficiary.last_name + " " + beneficiary.first_name}</td>
                        <td>{beneficiary.date_of_birth}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </>
          }

        </table>
      </Container>
    </div>
  )
}
export default Table;