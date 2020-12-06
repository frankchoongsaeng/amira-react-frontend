import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import Beneficiary from './Beneficiary';
import BeneficiaryTable from './BeneficiaryTable';
import LoginPage from './LoginPage';



function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage}/>
          <Route exact path="/beneficiaries/add" component={Beneficiary} />
          <Route exact path="/beneficiaries/view/:id" component={BeneficiaryTable} />
          <Route path="/beneficiaries" component={BeneficiaryTable} />
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>

    </>
  )
}

export default Router;