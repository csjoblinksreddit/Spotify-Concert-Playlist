import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import ArtistPic from '../../images/artist.jpg'
import { Collapse } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';



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
  description: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#02FE8F'
  },
  content:{
    height: 250
  }

});

export default function ImageCard({checked}) {
  const classes = useStyles();
  const [hovered, setHovered] = useState(true);

  const handleChange = () => {
    setHovered((prev) => !prev);
  }

  return (
    <Collapse in={checked}
    {...(checked ? {timeout: 1000} : {})} >
      <Card className={classes.root}>
          
            <CardMedia
              className={classes.media}
              image={ArtistPic}
              onMouseEnter= { () => handleChange()} 
              onMouseOut = { () => handleChange()}
            />
          
          <CardContent>
            
            <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
            Make a playlist based on your favorite artists!
            </Typography>

            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            <Link to={{
                          pathname:'../playlist',
                    
                      }}><Button variant="contained" id="buttonLink" type="submit">Create By Artists</Button></Link>
            
            </Typography>
          </CardContent>
      
      </Card>
    </Collapse>
  );
}
