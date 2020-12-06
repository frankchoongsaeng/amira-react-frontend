import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from './Container';
import NavBar from './NavBar';
import { createBeneficiary } from '../controllers/beneficiary_controller';

function Beneficiary() {

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [placeOfBirth, setPlaceOfBirth] = useState("");
	const [education, setEducation] = useState("");
	const [gender, setGender] = useState("male");
	const [maritalStatus, setMaritalStatus] = useState("single");
	const [gaurdianName, setGuardianName] = useState("");
	const [gaurdianDOA, setGaurdianDOA] = useState("alive");
	const [gaurdianOccupation, setGaurdianOccupation] = useState("");

	const history = useHistory();

	const addBeneficiary = (e) => {
		e.preventDefault();

		createBeneficiary({
			firstName, lastName, dateOfBirth,
			placeOfBirth, education, gender,
			maritalStatus, guardianName: gaurdianName, guardianAlive: gaurdianDOA === "alive",
			guardianOccupation: gaurdianOccupation, token: localStorage.getItem("token")
		},

			(status, beneficiaryData) => {

				if (status === 201) {
					alert("Beneficiary added successfully");

					if (window.confirm("Would you like to add another?")) {
						setFirstName("")
						setLastName("")
						setDateOfBirth("")
						setPlaceOfBirth("")
						setEducation("")
						setGender("male")
						setMaritalStatus("single")
						setGuardianName("")
						setGaurdianDOA("alive")
						setGaurdianOccupation("")
					}
					else {
						history.push("/beneficiaries");
					}
				}

				else if (status === 500) {
					alert("Error completing action. server might be down");
				}

				else if (status === 408) {
					alert("An error occurred might be a request blocking configuration on your computer or a bad network");
				}

				else if (status === 403) {
					alert("One or more fields have not been filled. Please check all fields and try again");
				}

				else if (status === 400) {
					alert("One or more fields have not been filled. Please check all fields and try again");
				}

				else {
					alert("Could not send request, please check your network connection");
				}
			}
		);
	}

	useEffect(() => {
		let token = localStorage.getItem("token");
		if (!token) {
			return history.push("/");
		}
	}, [history])

	return (
		<>
			<NavBar />
			<Container>
				<form className="w-50 mx-auto mt-5 mb-5 pb-5">
					<div className="form-row">
						<div className="col-md-6 mb-3">
							<label for="validationDefault01">First name</label>
							<input type="text" className="form-control" id="validationDefault01" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} required />
						</div>
						<div className="col-md-6 mb-3">
							<label for="validationDefault02">Last name</label>
							<input type="text" className="form-control" id="validationDefault02" value={lastName} onChange={(e) => { setLastName(e.target.value) }} required />
						</div>
					</div>

					<div className="form-row">
						<div className="col-md-6 mb-3">
							<label for="inputbirthl4">Place of birth</label>
							<input type="text" className="form-control" id="inputbirthl4" value={placeOfBirth} onChange={(e) => { setPlaceOfBirth(e.target.value) }} required />
						</div>
						<div className="col-md-6 mb-3">
							<label for="inputEducation4">Education</label>
							<input type="text" className="form-control" id="inputEducation4" value={education} onChange={(e) => { setEducation(e.target.value) }} required />
						</div>
					</div>

					<div className="form-row">
						<div className="col-md-12 mb-3">
							<label for="birthDay">Date of birth</label>
							<input type="date" className="form-control" id="birthDay" value={dateOfBirth} onChange={(e) => { setDateOfBirth(e.target.value) }} required />
						</div>
					</div>

					<div className="form-row mb-3">
						<div className="form-group col-md-2 border-right mb-3">
							<label for="gender">Gender</label>
							<div>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="gender" id="maleGender" value="male" defaultChecked onChange={(e) => { setGender(e.target.value) }} required />
									<label className="form-check-label" for="maleGender">Male</label>
								</div>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="gender" id="femaleGender" value="female" onChange={(e) => { setGender(e.target.value) }} required />
									<label className="form-check-label" for="femaleGender">Female</label>
								</div>
							</div>
						</div>
						<div className="form-group col-md-3 pl-3">
							<label for="maritalStatus">Marital Status</label>
							<div>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="maritalStatus" id="single" value="single" defaultChecked onChange={(e) => { setMaritalStatus(e.target.value) }} required />
									<label className="form-check-label" for="single">Single</label>
								</div>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="maritalStatus" id="married" value="married" onChange={(e) => { setMaritalStatus(e.target.value) }} required />
									<label className="form-check-label" for="married">Married</label>
								</div>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="maritalStatus" id="divorced" value="divorced" onChange={(e) => { setMaritalStatus(e.target.value) }} required />
									<label className="form-check-label" for="divorced">Divorced</label>
								</div>
							</div>
						</div>
					</div>

					<hr />

					<div className="form-group mt-3">
						<label for="inputParent/Guardian">Parent/Guardian Name</label>
						<input type="text" className="form-control" id="inputParent/Guardian" placeholder="" value={gaurdianName} onChange={(e) => { setGuardianName(e.target.value) }} />
					</div>
					<div className="form-row">
						<div className="form-group col-md-4  border-right">
							<label for="inputSingle, Married or Divorced">Parent/Gaurdian is: </label>
							<div>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="doa" id="dead" value="dead" onChange={(e) => { setGaurdianDOA(e.target.value) }} />
									<label className="form-check-label" for="dead">Dead</label>
								</div>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="doa" id="alive" value="alive" defaultChecked onChange={(e) => { setGaurdianDOA(e.target.value) }} />
									<label className="form-check-label" for="alive">Alive</label>
								</div>
							</div>
						</div>

						<div className="form-group col-md-8 pl-md-3">
							<label for="occupation">Parent occupation</label>
							<input type="text" className="form-control" id="occupation" value={gaurdianOccupation} onChange={(e) => { setGaurdianOccupation(e.target.value) }} />
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-12">
							<button className="btn btn-primary" onClick={addBeneficiary}>Add Beneficiary</button>
						</div>
					</div>
				</form>
			</Container>
		</>
	)
}


export default Beneficiary;