import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FaceIcon from '@material-ui/icons/Face';

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class UserList extends Component {
  renderUsers = () => {
    return this.props.users.map((user) => (
      <ListItem
        key={user.id}
        user={user}
        dense
        button
        className={this.props.listItem}
      >
        <FaceIcon color="primary" />
        <ListItemText primary={user.username} />
        <ListItemSecondaryAction>
          {this.props.userFriends.find((f) => f.id === user.id) ? (
            <IconButton aria-label="Comments">
              <FavoriteIcon style={{ color: 'red' }} />
            </IconButton>
          ) : (
            <IconButton aria-label="Comments">
              <FavoriteIcon
                onClick={() => this.props.handleAddingFriend(user)}
              />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>{this.renderUsers()}</List>
      </div>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
