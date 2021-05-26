import React, { Component } from "react";
import firebaseApp from "./firebase";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import MainPage from "./Pages/MainPage";
import AboutPage from "./Pages/AboutPage";
import FormsPage from "./Pages/FormsPage";
import SuccessPage from "./Pages/SuccessPage";
import UserPage from "./Pages/UserPage";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

// Main App State -- set up to deal with the Sign Up/Login/Logout Processes 

class App extends Component {
  state = {
    visible: false,
    user: null,
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    suite: '',
    street: '',
    city: '',
    country: '',
    postalCode: '',
    phoneNumber: '',
    subscriptionPlan: "The Regular -- $8",
    payments: []
  }

  openModal = () => {
    this.setState({
      visible: true
    });
  }

  closeModal = () => {
    this.setState({
      visible: false
    });
  }

  changeHandler = input => event => {
    this.setState({ [input]: event.target.value })
  }

  stepForward = () => {
    const { step } = this.state
    this.setState({
      step: step + 1
    })
    if(this.state.step === 2) {
      axios.delete("http://localhost:8080/deleteAll")
      .then(console.log("Log Cleared"));
    }
  }

  stepBackward = () => {
    const { step } = this.state
    this.setState({
      step: step - 1
    })
  }

  logDates = (arr) => {
    if (this.state.subscriptionPlan === "The Regular -- $8") {
      let paymentArr = arr.map(item => {
        return { id: uuidv4(), "date": new Date(item).toLocaleDateString(), "amount": "$8" }
      })
      this.setState({
        payments: paymentArr
      })
    } else if (this.state.subscriptionPlan === "The Occasional -- $9") {
      let paymentArr = arr.map(item => {
        return { id: uuidv4(), "date": new Date(item).toLocaleDateString(), "amount": "$9" }
      })
      this.setState({
        payments: paymentArr
      })
    } else {
      let paymentArr = arr.map(item => {
        return { id: uuidv4(), "date": new Date(item).toLocaleDateString(), "amount": "$10" }
      })
      this.setState({
        payments: paymentArr
      })
    }
  }

  tempLog = () => {
    axios.post("http://localhost:8080/temp/User",
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        suite: this.state.suite,
        street: this.state.street,
        city: this.state.city,
        country: this.state.country,
        postalCode: this.state.postalCode,
        phoneNumber: this.state.phoneNumber,
        subscriptionPlan: this.state.subscriptionPlan
      }).catch(err => {
        console.log(err);
      })

    axios.post("http://localhost:8080/temp/Payments",
      {
        email: this.state.email,
        payments: this.state.payments
      })
  }

  authListener = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
        localStorage.removeItem('email');
      }
    });
  }

  componentDidMount() {
    this.authListener();
  }

  Login = (e) => {
    e.preventDefault();
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).catch((err) => {
      console.log(err);
    });
    this.closeModal();
    localStorage.setItem("email", this.state.email);
  }

  Logout = () => {
    firebaseApp.auth().signOut();
  }

  UserHandler = () => {
    axios.get("http://localhost:8080/temp/User")
      .then(res => {
        console.log(res.data[0].firstName);
        this.setState({
          firstName: res.data[0].firstName,
          lastName: res.data[0].lastName,
          email: res.data[0].email,
          password: res.data[0].password,
          phoneNumber: res.data[0].phoneNumber,
          suite: res.data[0].suite,
          street: res.data[0].street,
          city: res.data[0].city,
          country: res.data[0].country,
          postalCode: res.data[0].postalCode,
          subscriptionPlan: res.data[0].subscriptionPlan
        })
      })
      .then(() => {
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .catch((err) => {
            console.log(err);
          })

        axios.post("http://localhost:8080/signup",
          {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            suite: this.state.suite,
            street: this.state.street,
            city: this.state.city,
            country: this.state.country,
            postalCode: this.state.postalCode,
            phoneNumber: this.state.phoneNumber,
            subscriptionPlan: this.state.subscriptionPlan
          }).catch(err => {
            console.log(err);
          })
        localStorage.setItem("email", this.state.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  PaymentHandler = () => {
    axios.get("http://localhost:8080/temp/Payments")
      .then(res => {
        this.setState({
          email: res.data[0].email,
          payments: res.data[0].payments
        })
      })
      .then(() => {
        axios.post("http://localhost:8080/signup/payments",
          {
            email: this.state.email,
            payments: this.state.payments
          })
      })
      .then(() => {
        axios.delete("http://localhost:8080/deleteAll")
          .then(console.log("Sign Up Complete!"));
      })
  }

  SignUp = (e) => {
    e.preventDefault();
    this.UserHandler();
    this.PaymentHandler();
  }

  render() {
    const { firstName, lastName, email, password, suite, street, city, country, postalCode, phoneNumber, cardNumber,
      cardName, cvc, expiry, subscriptionPlan, step, user } = this.state;

    const values = {
      firstName, lastName, email, step, password, suite, street, city, country, postalCode, phoneNumber, cardNumber,
      cardName, cvc, expiry, subscriptionPlan, user
    };

    document.title = "Welcome to Ya-bento!"

    return (
      <div className="App">
        <Router>
          <NavBar openModal={this.openModal} closeModal={this.closeModal} visible={this.state.visible} user={this.state.user}
            login={this.Login} logout={this.Logout} changeHandler={this.changeHandler} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>

            <Route path="/home" render={(routeProps) => {
              return (<MainPage {...routeProps}
                openModal={this.openModal} closeModal={this.closeModal} visible={this.state.visible} user={this.state.user} />);
            }} />

            <Route path="/about" render={(routeProps) => {
              return (<AboutPage {...routeProps}
              />);
            }} />
            <Route path="/signup" render={(routeProps) => {
              return (<FormsPage {...routeProps}
                stepForward={this.stepForward} stepBackward={this.stepBackward} values={values} changeHandler={this.changeHandler}
                logDates={this.logDates} tempLog={this.tempLog} />);
            }} />

            {this.state.user !== null && <Redirect from="/success" to="/home" />}
            <Route path="/success" render={(routeProps) => {
              return (<SuccessPage {...routeProps} signUp={this.SignUp} values={values} changeHandler={this.changeHandler} />);
            }} />

            <Route path="/myAccount" render={(routeProps) => {
              return (<UserPage {...routeProps}
                values={values} openModal={this.openModal} closeModal={this.closeModal} visible={this.state.visible} />);
            }} />

          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;

