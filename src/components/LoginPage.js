import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import Container from './Container';
import { login, validateToken } from '../controllers/user_controller';
import { useHistory } from 'react-router-dom';
import loginImage from './timeTD.jpg';
import NavBar from './NavBar';

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    // attempt to login if the user 
    // provided a email and password
    if (email && password) {
      login(email, password, (status, data) => {

        if (status === 200) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.user.position)
          history.push("/");
        }

        else if (status === 500) {
          alert("Error completing action. server might be down");
        }

        else if (status === 401) {
          alert("password incorrect");
        }

        else if (status === 404) {
          alert("User does not exist, try signing up for a new account");
        }

        else if (status === 400) {
          alert("One or more fields have not been filled. Please check all fields and try again");
        }

        else {
          alert("Could not send request, please check your network connection");
        }

      });
    }

  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      validateToken(token, (isValid) => {
        if (isValid) {
          history.push("/")
        }
      })
    }
  }, [history])


  return (
    <>
      <NavBar />
      <Hero img={loginImage} title="Login" subtitle="only admin can login here" />
      <Container>
        <form className="mx-auto w-50 mb-5 pb-5" >
          <div className="form-group">
            <label htmlfor="inputEmail4">Email</label>
            <input type="text" className="form-control" id="inputEmail4" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlfor="inputPassword4">Password</label>
            <input type="password" className="form-control" id="inputPassword4" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="mt-3 btn btn-block btn-primary" onClick={handleLogin} >Login</button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default LoginPage;