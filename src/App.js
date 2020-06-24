import React, { Component} from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

import AuthService from "./services/auth.service";
import BoardModerator from "./components/board-moderator.component";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));



class App extends Component {

    constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

componentDidMount() {
const user = AuthService.getCurrentUser(); 
  //write your condition here
  if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  return true;

  if (user === null) {
      return <Redirect to='/login'/>;
    }
  return false;

}



  logOut() {
    AuthService.logout();
  }


  render() {
    return (
          <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" component={Login} />
              <Route exact path="/register" name="Register Page" component={Register} />
              <Route exact path="/404" name="Page 404" component={Page404} />
              <Route exact path="/500" name="Page 500" component={Page500} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/" name="Home" component={DefaultLayout} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}


export default App;

