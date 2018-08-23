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
import SentimentVerySatisfied from '@material-ui/icons/SentimentVerySatisfied';

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class UserFriendsList extends Component {
  renderUserFriends = () => {
    return this.props.friends.map((friend) => (
      <ListItem
        key={friend.id}
        friend={friend}
        dense
        button
        className={this.props.listItem}
      >
        <SentimentVerySatisfied color="primary" />
        <ListItemText primary={friend.username} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments">
            <FavoriteIcon style={{ color: 'red' }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>{this.renderUserFriends()}</List>
      </div>
    );
  }
}

UserFriendsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserFriendsList);
