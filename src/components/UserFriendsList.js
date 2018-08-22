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

const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class UserFriendsList extends Component {
  state = {
    checked: [1]
  };

  handleToggle = (value) => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  renderUserFriends = () => {
    return this.props.friends.map((friend) => (
      <ListItem
        key={friend.id}
        friend={friend}
        dense
        button
        className={this.props.listItem}
      >
        <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" />
        <ListItemText primary={friend.username} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments">
            <FavoriteIcon />
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
