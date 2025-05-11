import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Use Switch instead of Routes
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SubscriptionPage from "./components/SubscriptionPage"; // Adjusted to match location
import LoginPage from './components/LoginPage'; // Import the Login page
import BooksPage from './components/BooksPage';
import BookReaderPage from './components/BookReaderPage';
import NotFound from './components/NotFound';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard.jsx';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>  {/* Use Switch for React Router v5 */}
        <Route path="/" exact component={HomePage} />
        <Route path="/subscription" exact component={SubscriptionPage} />
        <Route path="/login" exact component={LoginPage} /> {/* Add route for LoginPage */}
        <Route exact path="/books" component={BooksPage} />
        <Route path="/books/:id" component={BookReaderPage} />
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;