import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import pablo from '../Images/pablo.png';

const profileCard = (props) => (
  <Card
    image={pablo}
    header={props.username}
    meta={props.email}
    // description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
    extra={
      <div onClick={props.onShowFriendsClick}>
        <a>
          <Icon name="user" />
          {props.userFriends.length} Friends
        </a>
      </div>
    }
  />
);

export default profileCard;
