import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class ControlledExpansionPanels extends Component {
  state = {
    expanded: null
  };

  handleChange = (panel) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const game = this.props.game;
    const { classes } = this.props;
    const { expanded } = this.state;

    console.log(game);

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{game.sport}</Typography>
            <Typography className={classes.secondaryHeading}>
              {game.date} @ {game.time}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {game.address} <br /> {game.comments}
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="medium" color="primary">
              Leave Game
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
        <br />
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
