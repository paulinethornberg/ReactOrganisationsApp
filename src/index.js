import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll';
import './index.css';
import './myStyle.css';
import App from './App';
import HomePage from './Pages/Home';
import AboutPage from './Pages/About';
import OrganisationPage from './Pages/Organisation';
import Category from './Components/Category';
import FilteredOrganisations from './Pages/FilteredOrganisations'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
 <Router history={hashHistory} render={applyRouterMiddleware(useScroll())}>
    <Route name="app" path="/" component={App}>
      <IndexRoute name="home" component={HomePage}>
        <IndexRedirect to="categories" />
        <Route name="categories" path="categories" component={Category} />
        </IndexRoute>
      <Route name="organsiations" path="organisations" component={FilteredOrganisations} />
      <Route name= "organisation" path="organisations/:organisationSlug" component={OrganisationPage} />
    </Route>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
