import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll';
import './index.css';
import App from './App';
import HomePage from './Pages/Home';
import AboutPage from './Pages/About';
import StorePage from './Pages/Store';
import OrganisationListing from './Components/OrganisationListing';
import OrganisationsPage from './Pages/Organisations';
import OrganisationPage from './Pages/Organisation';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
 <Router history={hashHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}>
       <IndexRedirect to="organisationWithFilter" />
        <Route path="organisationWithFilter" component={OrganisationListing} />
        </IndexRoute>
      <Route path="organisations/:organisationSlug" component={OrganisationPage} />
      <Route path="about" component={AboutPage} />
      <Route path="organisations" component={OrganisationsPage} />
      <Route path="store" component={StorePage}>
        <IndexRedirect to="organisationWithFilter" />
        <Route path="organisationWithFilter" component={OrganisationListing} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
