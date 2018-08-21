import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { navbarLogin } from '../redux/actions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1
  },
  button1: {
    marginLeft: '80%'
  }
};

const mapStateToProps = (state) => ({
  clickedNavbarLogin: state.clickedNavbarLoginButton,
  registerResponse: state.registerResponse,
  loggedIn: state.loggedIn,
  username: state.usernameInputField
});

const mapDispatchToProps = (dispatch) => ({
  navbarLogin: () => dispatch(navbarLogin())
});

function DenseAppBar(props) {
  console.log(props);
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="title" color="inherit">
            RU.Game
          </Typography>
          {props.loggedIn ? (
            <Fragment> {props.username} </Fragment>
          ) : (
            <Fragment>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.button1}
                component={Link}
                to="/login"
              >
                LOGIN
              </Button>

              <Button
                variant="outlined"
                size="large"
                color="secondary"
                className={classes.button2}
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DenseAppBar));
