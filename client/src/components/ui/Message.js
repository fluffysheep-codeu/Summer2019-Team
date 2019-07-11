/**
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
/**
 * A message card.
 * @return The html representation of the card.
 */

const styles = function() {
  return {
    card: {
      maxWidth: 400,
      margin: 24
    },
    media: {
      height: 0,
      paddingTop: '75%'
    }
  };
};

class MessagesCard extends React.Component {
  render() {
    const { classes, user, timestamp, text } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardHeader title={user} subheader={timestamp} />

          <CardContent>{text}</CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

const Message = function(props) {
  return (
    <div className='Message message-div'>
      <div className='message-header'>
        {props.user + ' - ' + new Date(props.timestamp)}
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.text }} />
    </div>
  );
};

Message.propTypes = {
  /** Name of the user posting the message. */
  user: PropTypes.string,
  /** The timestamp of the message. */
  timestamp: PropTypes.number,
  /** The content of the message. */
  text: PropTypes.string
};

export default withStyles(styles)(MessagesCard);
