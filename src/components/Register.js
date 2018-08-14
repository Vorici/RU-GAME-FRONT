import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react';
import Login from './Login';

const CREATE_USER_URL = 'http://localhost:5000/users/create';

// REMEMBER TO FIX THAT LOGIN PAGE DOES NOT APPEAR AFTER REGISTRATION

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registrationClick: false,
      usernameInputField: null,
      emailInputField: null,
      passwordInputField: null,
      confirmPasswordInputField: null,
      registerResponse: null
    };
  }

  createUser = (email, username, password, confirmedPassword) => {
    if (password === confirmedPassword) {
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
        this.setState({
          registerResponse: r.status
        })
      );
    } else {
      this.setState({ registrationClick: false });
      alert('Your Passwords did not match! Please try again.');
    }
  };

  handleRegistration = () => {
    this.createUser(
      this.state.emailInputField,
      this.state.usernameInputField,
      this.state.passwordInputField,
      this.state.confirmPasswordInputField
    );

    this.setState({
      registrationClick: true
    });
    this.renderLoginAfterRegistration();
  };

  handleRegisterUsername = (event) => {
    this.setState({
      usernameInputField: event.target.value
    });
  };

  handleRegisterEmail = (event) => {
    this.setState({
      emailInputField: event.target.value
    });
  };

  handleRegisterPassword = (event) => {
    this.setState({
      passwordInputField: event.target.value
    });
  };

  handleRegisterConfirmedPassword = (event) => {
    this.setState({ confirmPasswordInputField: event.target.value });
  };

  changeResponseCodeToNull = () => {
    this.setState({ registerResponse: null });
  };

  renderLoginAfterRegistration = () => {
    if (this.state.registrationClick) {
      return (
        <div>
          <Login onAuthLoginClick={this.props.onAuthLoginClick} />
        </div>
      );
    } else {
      switch (this.state.registerResponse) {
        case 200:
          this.changeResponseCodeToNull();
          return (
            <div>
              <Login />
            </div>
          );
        case 204:
          alert('Email Already In Use');
          this.changeResponseCodeToNull();
          return (
            <div>
              <Modal size={'small'} open={true} closeIcon>
                <Modal.Content>
                  <div className="ui middle aligned center aligned grid">
                    <div className="column">
                      <h2 className="ui image header">
                        <div className="content">Register</div>
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
                                onChange={(event) =>
                                  this.handleRegisterUsername(event)
                                }
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
                                onChange={(event) =>
                                  this.handleRegisterEmail(event)
                                }
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
                            Sign Up!
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Modal.Content>
              </Modal>
            </div>
          );
        default:
          return (
            <div>
              <Modal size={'small'} open={true} closeIcon>
                <Modal.Content>
                  <div className="ui middle aligned center aligned grid">
                    <div className="column">
                      <h2 className="ui image header">
                        <div className="content">Register</div>
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
                                onChange={(event) =>
                                  this.handleRegisterUsername(event)
                                }
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
                                onChange={(event) =>
                                  this.handleRegisterEmail(event)
                                }
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
                            Sign Up!
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
  };

  render() {
    return this.renderLoginAfterRegistration();
  }
}
