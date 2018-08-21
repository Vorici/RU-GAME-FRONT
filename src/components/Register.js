import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsername, getEmail, getRegisterResponse } from '../redux/actions';
import { Button, Icon } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react';

const CREATE_USER_URL = 'http://localhost:5000/users/create';

const mapStateToProps = (state) => ({
  usernameInputField: state.usernameInputField,
  emailInputField: state.emailInputField,
  registerResponse: state.registerResponse
});

const mapDispatchToProps = (dispatch) => ({
  getUsername: (e) => dispatch(getUsername(e)),
  getEmail: (e) => dispatch(getEmail(e)),
  registerResponse: (r) => dispatch(getRegisterResponse(r))
});

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordInputField: null,
      confirmPasswordInputField: null,
      registrationClick: false
    };
  }

  createUser = (email, username, password, confirmedPassword) => {
    console.log(username);
    if (
      password !== '' &&
      password !== null &&
      password === confirmedPassword
    ) {
      const postConfig = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            username: username
          }
        })
      };
      return fetch(CREATE_USER_URL, postConfig).then((r) =>
        this.renderBasedOnStatusCode(r.status)
      );
    } else {
      this.setState({ registrationClick: false });
      alert('Your Passwords did not match! Please try again.');
    }
  };

  renderBasedOnStatusCode = (response) => {
    console.log(response);
    if (response === 204) {
      alert('Email/Username already in use...');
    } else {
      return this.props.registerResponse(response);
    }
  };

  handleRegistration = () => {
    console.log('HIIIII', this.props);
    this.createUser(
      this.props.emailInputField,
      this.props.usernameInputField,
      this.state.passwordInputField,
      this.state.confirmPasswordInputField
    );
  };

  handleRegisterPassword = (event) => {
    this.setState({
      passwordInputField: event.target.value
    });
  };

  handleRegisterConfirmedPassword = (event) => {
    this.setState({ confirmPasswordInputField: event.target.value });
  };

  // changeResponseCodeToNull = () => {
  //   this.setState({ registerResponse: null });
  // };

  render() {
    console.log(this.props.registerResponse);
    return (
      <div>
        <Modal size={'small'} open={true} closeIcon>
          <Modal.Content>
            <div className="ui middle aligned center aligned grid">
              <div className="column">
                <h2 className="ui image header">
                  <div className="content">Registration</div>
                </h2>
                <form
                  action="https://s.codepen.io/voltron2112/debug/PqrEPM?"
                  method="get"
                  className="ui large form"
                >
                  <div className="ui stacked secondary  segment">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon" />
                        <input
                          onChange={(event) => this.props.getUsername(event)}
                          type="text"
                          name="username"
                          placeholder="Create a UserName"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="mail icon" />
                        <input
                          onChange={(event) => this.props.getEmail(event)}
                          type="text"
                          name="email"
                          placeholder="E-Mail Address"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon" />
                        <input
                          onChange={(event) =>
                            this.handleRegisterPassword(event)
                          }
                          type="password"
                          name="password"
                          placeholder="Create a Password"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon" />
                        <input
                          onChange={(event) =>
                            this.handleRegisterConfirmedPassword(event)
                          }
                          type="password"
                          name="password2"
                          placeholder="Confirm Your Password"
                        />
                      </div>
                    </div>
                    <div
                      onClick={this.handleRegistration}
                      className="ui fluid large teal submit button"
                    >
                      <Link to={'/login'}> Sign Up! </Link>
                    </div>
                    <div className="ui message">
                      <Button animated="fade">
                        <Button.Content visible>
                          <Link to={'/login'}> Already have an account? </Link>
                        </Button.Content>
                        <Button.Content hidden>
                          <Link to={'/login'}> Log in here! </Link>
                        </Button.Content>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
