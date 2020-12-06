import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import NavBar from './NavBar';
import loginImage from './datasync.png';
import { signup } from '../controllers/user_controller';
import { useHistory } from 'react-router-dom';
import Container from './Container';


function SignUpPage() {

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");
	const [country, setCountry] = useState("");
	const [telephoneNumber, setTelephoneNumber] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [zip, setZip] = useState("");
	const [company, setCompany] = useState("");
	const [position, setPosition] = useState("");
	const history = useHistory();


	const setStates = {
		firstName: setFirstName,
		lastName: setLastName,
		email: setEmail,
		password: setPassword,
		address: setAddress,
		country: setCountry,
		telephoneNumber: setTelephoneNumber,
		state: setState,
		city: setCity,
		zip: setZip,
		company: setCompany,
		position: setPosition
	}

	const states = {
		firstName, lastName, email,
		password, address, country, telephoneNumber,
		state, city, zip, company, position
	}

	function handleChange(event) {
		setStates[event.target.id](event.target.value);
	}

	useEffect(() => {
		let token = localStorage.getItem("token");
		if (token) {
			history.push("/");
		}
	}, [history])

	function submitForm(event) {
		event.preventDefault();
		signup(states, (status, data) => {

			if (status === 201) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("role", data.user.position)
				history.push("/");
			}

			else if (status === 500) {
				alert("Error completing action. server might be down");
			}

			else if (status === 409) {
				alert("A user with that email already exists, you may try logging in instead");
			}

			else if (status === 400) {
				alert("One or more fields have not been filled. Please check all fields and try again");
			}

			else {
				alert("Could not send request, please check your network connection");
			}
		})
	}


	return (

		<>
			<NavBar />
			<Hero img={loginImage} title="Register" subtitle="" />

			<Container>
				<form className="w-50 mx-auto mb-5 pb-5">
					<div className="form-row">
						<div className="col-md-6 mb-3">
							<label for="firstName">First name</label>
							<input type="text" className="form-control" id="firstName" value={firstName} required onChange={handleChange} />
						</div>
						<div className="col-md-6 mb-3">
							<label for="lastName">Last name</label>
							<input type="text" className="form-control" id="lastName" value={lastName} required onChange={handleChange} />
						</div>
					</div>

					<div className="form-row">
						<div className="col-md-6 mb-6">
							<label for="email">Email</label>
							<input type="email" className="form-control" id="email" value={email} onChange={handleChange} />
						</div>
						<div className="col-md-6 mb-6">
							<label for="password">Password</label>
							<input type="password" className="form-control" id="password" value={password} onChange={handleChange} />
						</div>
					</div>

					<div className="form-row pt-3">
						<div className="form-group col-md-12">
							<label for="address">Address</label>
							<input type="text" className="form-control" id="address" placeholder="" value={address} onChange={handleChange} />
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="country">Country</label>
							<input type="text" className="form-control" id="country" value={country} onChange={handleChange} />
						</div>

						<div className="form-group col-md-6">
							<label for="telephoneNumber">Telephone number</label>
							<input type="text" className="form-control" id="telephoneNumber" value={telephoneNumber} onChange={handleChange} />
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="city">City</label>
							<input type="text" className="form-control" id="city" value={city} onChange={handleChange} />
						</div>
						<div className="form-group col-md-4">
							<label for="state">State</label>
							<input id="state" className="form-control" value={state} onChange={handleChange} />
						</div>
						<div className="form-group col-md-2">
							<label for="zip">Zip</label>
							<input type="text" className="form-control" id="zip" value={zip} onChange={handleChange} />
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="company">Company</label>
							<input id="company" className="form-control" value={company} onChange={handleChange} />
						</div>
						<div className="form-group col-md-6">
							<label for="position">Position</label>
							<select id="position" className="form-control" onChange={handleChange} value={position}>
								<option selected>Choose...</option>
								<option value="monetary and evaluation officer" >Monetary and Evaluation Officer</option>
								<option value="field agent" >Field Agent</option>
								<option value="supervisor" >Supervisor</option>
							</select>
						</div>
					</div>

					<button type="submit" className="btn btn-primary" onClick={submitForm}>Sign Up</button>
				</form>
			</Container>

		</>
	);
}


export default SignUpPage;