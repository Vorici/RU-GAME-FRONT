import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import Navbar from './Navbar';

export default class Login extends Component {
  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui image header">
            <div className="content">Log-in to your account</div>
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
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="ui fluid large teal submit button">Login</div>
            </div>

            <div className="ui error message" />
          </form>

          <div className="ui message">
            <Button onClick={this.props.onRegisterClick} animated="fade">
              <Button.Content visible>New to us?</Button.Content>
              <Button.Content hidden>Sign up here!</Button.Content>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
