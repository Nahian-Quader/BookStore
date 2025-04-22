import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  // Use Switch instead of Routes
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SubscriptionPage from "./components/SubscriptionPage";  // Adjusted to match location


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>  {/* Use Switch for React Router v5 */}
        <Route path="/" exact component={HomePage} />
        <Route path="/subscription" exact component={SubscriptionPage} />
      </Switch>
    </Router>
  );
}

export default App;



