import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { navbarLogin, logUserOut } from '../redux/actions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1
  },
  button1: {
    marginLeft: '80%'
  },
  navbaruser: {
    marginLeft: '80%'
  }
};

const mapStateToProps = (state) => ({
  clickedNavbarLogin: state.clickedNavbarLoginButton,
  registerResponse: state.registerResponse,
  loggedIn: state.loggedIn,
  username: state.loggedInUser
});

const mapDispatchToProps = (dispatch) => ({
  navbarLogin: () => dispatch(navbarLogin()),
  logUserOut: () => dispatch(logUserOut())
});

function DenseAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="title" color="inherit">
            <Link to={'/'}>
              <a style={{ color: 'white' }}> ru.game</a>
            </Link>
          </Typography>
          {props.loggedIn ? (
            <Fragment>
              <div className={classes.navbaruser}>
                <IconButton className={classes.AccountCircle}>
                  <AccountCircle />
                </IconButton>
                <a style={{ color: 'white' }}>
                  {props.username} &nbsp;&nbsp;&nbsp;{' '}
                </a>
                <Link to={'/'}>
                  <Button
                    onClick={props.logUserOut}
                    variant="contained"
                    size="large"
                    color="secondary"
                  >
                    Logout
                  </Button>
                </Link>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                variant="contained"
                size="large"
                color="secondary"
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
