import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import UserList from '../components/UserList';
import UserFriendsList from '../components/UserFriendsList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      {props.showFriends ? (
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            My Friends &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            <Button
              onClick={props.handleShowAllUsersClick}
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
            >
              Back
              <ArrowBackIcon className={classes.left} />
            </Button>
            <br />
          </Typography>
          <Typography component="p">
            <UserFriendsList
              handleAddingFriend={props.handleAddingFriend}
              friends={props.userFriends}
            />
          </Typography>
          ;
        </Paper>
      ) : (
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            ACTIVE USERS
          </Typography>

          <Typography component="p">
            <UserList
              userFriends={props.userFriends}
              handleAddingFriend={props.handleAddingFriend}
              users={props.users}
            />
          </Typography>
        </Paper>
      )}
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
