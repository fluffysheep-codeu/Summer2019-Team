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
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ReactCardFlip from 'react-card-flip';
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
const style = function() {
  return {
    card: {
      // flexDirection: 'row',
      height: undefined,
      width: undefined,
      // alignSelf: 'center',
      marginBottom: 3,
      marginTop: 3,
      borderRadius: 3
    },
    cardItem: {
      borderLeftWidth: 5,
      borderLeftColor: '#ea7e7a'
    }
  };
};

MessagesCard = function(props) {
  return (
    <div className='Message message-div'>
      <CardActionArea>
        <div className='message-header'>
          <CardHeader title={props.user} subheader={props.timestamp} />
        </div>
        <CardContent>
          <CardMedia>
            {<div dangerouslySetInnerHTML={{ __html: props.text }} />}
          </CardMedia>
        </CardContent>
      </CardActionArea>
    </div>
  );
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

class ImageCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }
  render() {
    var { user, timestamp, text } = this.props;
    timestamp = new Date(timestamp);
    timestamp = timestamp.toString();
    return (
      <div>
        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection='vertical'>
          <Card key='front'>
            <CardActionArea onClick={this.handleClick}>
              <CardContent>
                <CardMedia>
                  {<div dangerouslySetInnerHTML={{ __html: text }} />}
                </CardMedia>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card key='back'>
            <CardActionArea onClick={this.handleClick}>
              <CardHeader title={user} subheader={timestamp} />

              <CardContent>
                <CardMedia>
                  <div dangerouslySetInnerHTML={{ __html: text }} />
                </CardMedia>
              </CardContent>
            </CardActionArea>
          </Card>
        </ReactCardFlip>
      </div>
    );
  }
}

export default withStyles(styles)(ImageCard);
