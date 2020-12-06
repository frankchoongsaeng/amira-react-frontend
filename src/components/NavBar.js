import { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

function NavBar() {

  const [loggedIn, setLoggedIn] = useState(false);
  const isFieldAgent = useRef(false)
  const history = useHistory();

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.go(0);
  }

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
      if(localStorage.getItem("role") === "field agent"){
        isFieldAgent.current = true;
      }
    }

  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">AiSync</Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mt-2 mt-lg-0">
            <li className="nav-item active mr-auto">
              <Link className="nav-link" to="/">Home<span className="sr-only"></span></Link>
            </li>
            { loggedIn && isFieldAgent.current &&
              <li className="nav-item">
                <Link className="nav-link " to="/beneficiaries/add" >Add Beneficiary</Link>
              </li>
            }
            { loggedIn &&
              <li className="nav-item">
                <Link className="nav-link " to="/beneficiaries" >View Beneficiaries</Link>
              </li>
            }
            { !loggedIn &&
              <li className="nav-item">
                <Link className="nav-link " to="/login" >Log In</Link>
              </li>
            }
            { loggedIn &&
              <li className="nav-item">
                <a href="/" className="nav-link " onClick={logout} >Log out</a>
              </li>
            }
            { !loggedIn &&
              <li className="nav-item">
                <Link className="nav-link " to="/signup" >Sign Up</Link>
              </li>
            }
          </ul>
        </div>
      </nav>

    </div>
  )
}
export default NavBar;