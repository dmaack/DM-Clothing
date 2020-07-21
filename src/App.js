import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';

class App extends React.Component {
  
  // Handling any auth state changes in our app / firebase backend
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //check if user auth exists
      if(userAuth) {
        // get the user document back
        const userRef = await createUserProfileDocument(userAuth);

        // listen/subscribe any user changes and get back the first state of that data
        userRef.onSnapshot(snapShot => {
          // will get data related to the user
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })

        })

      } else {
        // else, set the current user to null
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    //closes the subscribtion
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
        </Switch>
      </div>
    );
  }

};

const mapStateToProps = createStructuredSelector ({ 
  currentUser: selectCurrentUser
 })

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
