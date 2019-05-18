import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

class TeamIntroCard extends React.Component {
  render() {
    const { classes, name, subtitle, profilePic, description } = this.props;

    const showMedia = profilePic ? (
      <CardMedia className={classes.media} image={profilePic} title={name} />
    ) : null;

    return (
      <Card className={classes.card}>
        <CardHeader title={name} subheader={subtitle} />
        {showMedia}
        <CardContent>
          <Typography component='p'>{description}</Typography>
        </CardContent>
      </Card>
    );
  }
}

TeamIntroCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  profilePic: PropTypes.string
};

export default withStyles(styles)(TeamIntroCard);
