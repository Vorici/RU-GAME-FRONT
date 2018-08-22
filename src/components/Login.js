import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEmail, authLogin, clearRegisterResponse } from '../redux/actions';
import { Button, Icon } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react';

const mapStateToProps = (state) => ({
  emailInputField: state.emailInputField,
  registerResponse: state.registerResponse
});

const mapDispatchToProps = (dispatch) => ({
  getEmail: (e) => dispatch(getEmail(e)),
  authLogin: (res, user, userId) => dispatch(authLogin(res, user, userId)),
  setRegisterResponseToNull: () => dispatch(clearRegisterResponse())
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginPassword: null,
      authResponse: null
    };
  }

  getToken = () => {
    if (this.props.emailInputField && this.state.loginPassword) {
      const GET_TOKEN_URL = 'http://localhost:5000/user_token';
      const email = this.props.emailInputField.toLowerCase();
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
    const AUTH_URL = 'http://localhost:5000/auth';

    const getConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    return fetch(AUTH_URL, getConfig)
      .then((r) => r.json())
      .then((res) => this.props.authLogin(res.status, res.user, res.user_id));
  };

  handleLoginFormClick = () => {
    this.getToken();
  };

  handlePasswordInputChange = (event) => {
    this.setState({
      loginPassword: event.target.value
    });
  };

  renderEmailFromRegistration = () => {
    if (this.props.registerResponse === 200) {
      return (
        <div className="ui left icon input">
          <i className="user icon" />
          <input
            onChange={(event) => this.props.getEmail(event)}
            type="text"
            name="email"
            placeholder="E-mail address"
            value={this.props.emailInputField}
          />
        </div>
      );
      this.props.setRegisterResponseToNull();
    } else {
      return (
        <div className="ui left icon input">
          <i className="user icon" />

          <input
            onChange={(event) => this.props.getEmail(event)}
            type="text"
            name="email"
            placeholder="E-mail address"
          />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
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
                      {this.renderEmailFromRegistration()}
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
                    <Link to={'/'}>
                      <div
                        onClick={this.handleLoginFormClick}
                        className="ui fluid large teal submit button"
                      >
                        Login
                      </div>
                    </Link>
                  </div>

                  <div className="ui error message" />
                </form>

                <div className="ui message">
                  <Button animated="fade">
                    <Button.Content visible>
                      <Link to={'/register'}> New to us? </Link>
                    </Button.Content>
                    <Button.Content hidden>
                      <Link to={'/register'}> Sign up here! </Link>
                    </Button.Content>
                  </Button>
                </div>
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
)(Login);
