import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react';
import Register from './Register';
import Profile from '../containers/Profile';

const AUTH_URL = 'http://localhost:5000/auth';
const GET_TOKEN_URL = 'http://localhost:5000/user_token';
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedFormLoginButton: false,
      loggedIn: false,
      clickedFormRegisterButton: false,
      loginEmail: null,
      loginPassword: null,
      token: null,
      authResponse: null
    };
  }

  getToken = () => {
    if (this.state.loginEmail && this.state.loginPassword) {
      const email = this.state.loginEmail.toLowerCase();
      const password = this.state.loginPassword;
      const postConfig = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auth: {
            email: email,
            password: password
          }
        })
      };
      return fetch(GET_TOKEN_URL, postConfig)
        .then((r) => r.json())
        .then((response) => {
          this.testTokenAndSignIn(response.jwt);
        });
    }
  };

  testTokenAndSignIn = (token) => {
    const getConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    return fetch(AUTH_URL, getConfig).then((r) =>
      this.setState({
        authResponse: r.status
      })
    );
  };

  handleLoginFormClick = () => {
    this.setState({
      clickedFormLoginButton: true
    });
    this.getToken();
  };

  handleRegisterFormClick = () => {
    this.setState({
      clickedFormRegisterButton: true
    });
  };

  handleEmailInputChange = (event) => {
    console.log(this.state.loginEmail);
    this.setState({
      loginEmail: event.target.value
    });
  };

  handlePasswordInputChange = (event) => {
    console.log(this.state.loginPassword);
    this.setState({
      loginPassword: event.target.value
    });
  };

  handleLoggingIn = () => {
    this.setState({ loggedIn: true });
  };

  render() {
    if (this.state.authResponse) {
      console.log(this.state.authResponse);
    }
    // if (this.state.token) {
    //   console.log('token', this.state.token);
    // }
    // if (this.state.loginEmail) {
    //   console.log('email', this.state.loginEmail);
    // }
    return (
      <div>
        {this.state.clickedFormRegisterButton ? (
          <Register />
        ) : (
          <Modal size={'small'} open={true} closeIcon>
            <Modal.Content>
              <div className="ui middle aligned center aligned grid">
                <div className="column">
                  <h2 className="ui image header">
                    <div className="content">Login to your account</div>
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
                              this.handleEmailInputChange(event)
                            }
                            type="text"
                            name="email"
                            placeholder="E-mail address"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <div className="ui left icon input">
                          <i className="lock icon" />
                          <input
                            onChange={(event) =>
                              this.handlePasswordInputChange(event)
                            }
                            type="password"
                            name="password"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <div
                        onClick={(event) =>
                          this.handleLoginFormClick(event.target.value)
                        }
                        className="ui fluid large teal submit button"
                      >
                        Login
                      </div>
                    </div>

                    <div className="ui error message" />
                  </form>

                  <div className="ui message">
                    <Button
                      onClick={this.handleRegisterFormClick}
                      animated="fade"
                    >
                      <Button.Content visible>New to us?</Button.Content>
                      <Button.Content hidden>Sign up here!</Button.Content>
                    </Button>
                  </div>
                </div>
              </div>
            </Modal.Content>
          </Modal>
        )}
      </div>
    );
  }
}
