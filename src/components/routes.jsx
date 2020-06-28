import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";
  
// import HomePage from '../pages/Home'; // TODO: To be implemented.
import PostPage from '../pages/Post';

function Routes() {
	return (
	  <Router>
		<>
		  <Switch>
			<Route exact path="/p/:id">
			  <PostPage />
			</Route>
			<Route path="/">
			  {/* <HomePage /> */}
			  <PostPage />
			</Route>
		  </Switch>
		</>
	  </Router>
	);
}

export default Routes;