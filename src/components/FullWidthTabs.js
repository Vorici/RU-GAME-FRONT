import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import GameListItem from './GameListItem';
import UserGameListItem from './UserGameListItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = (state) => ({
  games: state.games,
  userGames: state.userGames
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  renderUserGameInstances = () => {
    return this.props.userGames.map((game) => (
      <UserGameListItem key={game.id} game={game} />
    ));
  };

  renderGameInstances = () => {
    return this.props.games.map((game) => (
      <GameListItem
        handleJoinGameClick={this.props.onJoinGameClick}
        key={game.id}
        userId={this.props.userId}
        game={game}
      />
    ));
  };

  render() {
    console.log(this.props);
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Current Games" />
            <Tab label="My Games" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            {this.renderGameInstances()}
          </TabContainer>
          <TabContainer
            onClick={this.props.OnMyGamesTabChange}
            dir={theme.direction}
          >
            {this.renderUserGameInstances()}
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(FullWidthTabs)
);
