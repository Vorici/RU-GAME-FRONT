import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import pablo from '../Images/pablo.png';

const friends = (
  <a>
    <Icon name="user" />
    16 Friends
  </a>
);

const profileCard = (props) => (
  <Card
    image={pablo}
    header={props.username}
    meta={props.email}
    // description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
    extra={friends}
  />
);

export default profileCard;
