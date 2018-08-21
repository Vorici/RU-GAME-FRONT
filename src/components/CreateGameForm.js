import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  list: {
    width: 250
  },
  root: {
    width: '100%',
    maxWidth: 500
  },
  fullList: {
    width: 'auto'
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class TemporaryDrawer extends Component {
  state = {
    top: false,
    clickedScheduleGame: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleScheduleGameClick = () => {
    this.props.handleCreateGameSubmit;
    this.setState({
      clickedScheduleGame: true
    });
  };

  render() {
    const placeName = this.props.placeName;
    const placeAddress = this.props.placeAddress;
    const placeHours = this.props.placeHours;
    const { classes } = this.props;

    return (
      <div>
        <Drawer
          anchor="bottom"
          open={true}
          onClose={this.toggleDrawer('bottom', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('bottom', false)}
            onKeyDown={this.toggleDrawer('bottom', false)}
          >
            <div>
              <Typography variant="display3" gutterBottom>
                {`${placeName}`}
              </Typography>
              <Typography variant="display1" gutterBottom>
                {`${placeAddress}`}
              </Typography>
              <br />
              {this.state.clickedScheduleGame ? (
                <div>
                  <form className={classes.container} noValidate>
                    <TextField
                      onChange={(event) => this.props.onDateChange(event)}
                      id="date"
                      label="Pick the date"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{ shrink: true }}
                    />
                  </form>
                  <br />
                  <br />
                  <form className={classes.container} noValidate>
                    <TextField
                      onChange={(event) => this.props.onTimeChange(event)}
                      id="time"
                      label="Pick the time"
                      type="time"
                      defaultValue="00:00"
                      className={classes.textField}
                      InputLabelProps={{ shrink: true }}
                      inputProps={
                        { step: 300 } // 5 min
                      }
                    />
                  </form>
                  <br />
                  <br />
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      onChange={(event) => this.props.onMaxPlayersChange(event)}
                      id="number"
                      label="Max Number of Players"
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{ shrink: true }}
                      margin="normal"
                    />
                  </form>

                  <TextField
                    onChange={(event) => this.props.onCommentsChange(event)}
                    id="multiline-static"
                    label="Comments"
                    multiline
                    rows="6"
                    className={classes.textField}
                    margin="normal"
                  />
                  <br />
                  <br />
                  <Button
                    onClick={this.props.onCreateGameFormSubmit}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                  >
                    Create Game !
                  </Button>
                  <br />
                  <br />
                  <br />
                </div>
              ) : (
                <div>
                  <Button
                    onClick={this.handleScheduleGameClick}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                  >
                    Schedule Game
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
