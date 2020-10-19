import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import ArtistPic from '../../images/artist.jpg'
import './landingPage.css'

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    background: '#997799',
    margin: '30px'
  },
  media: {
    height: 440,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#02FE8F'
  },
});

export default function ImageCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
  
        <CardMedia
          className={classes.media}
          image={ArtistPic}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          <Link to={{
                        pathname:'../playlist',
                   
                    }}><Button id="buttonLink" type="submit">Create By Artists</Button></Link>


          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Enter your favorite artists and instantly have their top 10 songs added 
          </Typography>
        </CardContent>
     
    </Card>
  );
}
