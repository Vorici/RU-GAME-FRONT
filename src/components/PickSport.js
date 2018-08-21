import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import baseballImage from '../Images/BASEBALL.jpg';
import footballImage from '../Images/FOOTBALL.jpg';
import soccerImage from '../Images/SOCCER.jpg';
import basketballImage from '../Images/basketballImage.jpg';
import tennisImage from '../Images/tennisImage.jpeg';
import golfImage from '../Images/golfImage.jpg';
import rugbyImage from '../Images/rugbyImage.jpg';
import volleyballImage from '../Images/volleyballImage.jpeg';
import poolImage from '../Images/billiardsImage.jpg';
import bowlingImage from '../Images/bowlingImage.jpg';
import iceHockeyImage from '../Images/iceHockeyImage.jpg';
import rollerHockeyImage from '../Images/rollerHockeyImage.jpeg';
import swimmingImage from '../Images/swimmingImage.jpg';
import snowboardImage from '../Images/snowboardingImage.jpg';
import skiImage from '../Images/skiImage.jpg';
import skateboardImage from '../Images/skateboardImage.jpg';
import fishingImage from '../Images/fishingImage.jpg';
import huntingImage from '../Images/huntingImage.jpg';
import cricketImage from '../Images/cricketImage.jpg';
import tableTennisImage from '../Images/tableTennisImage.jpeg';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%'
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15
      },
      '& $imageMarked': {
        opacity: 0
      },
      '& $imageTitle': {
        border: '4px solid currentColor'
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
});

const images = [
  {
    url: baseballImage,
    title: 'Baseball',
    width: '20%',
    term: 'Baseball Field'
  },
  {
    url: footballImage,
    title: 'Football',
    width: '20%',
    term: 'Football Field'
  },
  {
    url: soccerImage,
    title: 'Soccer',
    width: '20%',
    term: 'Soccer Field'
  },
  {
    url: basketballImage,
    title: 'basketball',
    width: '20%',
    term: 'Basketball Court'
  },
  {
    url: tennisImage,
    title: 'tennis',
    width: '20%',
    term: 'Tennis Field'
  },
  {
    url: golfImage,
    title: 'golf',
    width: '20%',
    term: 'Golf Course'
  },
  {
    url: volleyballImage,
    title: 'volleyball',
    width: '20%',
    term: 'Volleyball'
  },
  {
    url: rugbyImage,
    title: 'rugby',
    width: '20%',
    term: 'Rugby Field'
  },
  {
    url: poolImage,
    title: 'billiards',
    width: '20%',
    term: 'Billiards'
  },
  {
    url: bowlingImage,
    title: 'bowling',
    width: '20%',
    term: 'Bowling'
  },
  {
    url: iceHockeyImage,
    title: 'iceHockey',
    width: '20%',
    term: 'Ice Hockey'
  },
  {
    url: rollerHockeyImage,
    title: 'rollerHockey',
    width: '20%',
    term: 'Roller Hockey'
  },
  {
    url: swimmingImage,
    title: 'swimming',
    width: '20%',
    term: 'Swimming Pools'
  },
  {
    url: snowboardImage,
    title: 'snowboard',
    width: '20%',
    term: 'Snowboarding'
  },
  {
    url: skiImage,
    title: 'ski',
    width: '20%',
    term: 'Ski Resort'
  },
  {
    url: skateboardImage,
    title: 'skateboarding',
    width: '20%',
    term: 'Skateboard Park'
  },
  {
    url: fishingImage,
    title: 'fishing',
    width: '20%',
    term: 'Fishing Locations'
  },
  {
    url: huntingImage,
    title: 'hunting',
    width: '20%',
    term: 'Hunting Locations'
  },
  {
    url: cricketImage,
    title: 'cricket',
    width: '20%',
    term: 'Cricket Field'
  },
  {
    url: tableTennisImage,
    title: 'tableTennis',
    width: '20%',
    term: 'Table Tennis'
  }
];

function PickSport(props) {
  const sport = props.onSportClick;
  const { classes } = props;

  return (
    <div className={classes.root}>
      {images.map((image) => (
        <ButtonBase
          onClick={() => sport(image.term, image.title)}
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subheading"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}

PickSport.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PickSport);
