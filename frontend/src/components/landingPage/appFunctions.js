import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Appbar, IconButton} from '@material-ui/core';
import ImageCard from './ImageCard';
import ImageCard2 from './ImageCard2';
import {Link as Scroll } from 'react-scroll';
import playlistPage from "../normal-playlist/playlist";
import useWindowPosition from './useWindowPosition';
import Grid from '@material-ui/core/Grid';




const useStyles = makeStyles((theme) => ({
    root:{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down("md")]:{
            flexDirection:"column"
        }
    },

}));
export default function Header(){
    const classes = useStyles();
    const checked = useWindowPosition('header');
    return(
        <div className={classes.root} id="appFunctions">
            
            <ImageCard checked={checked}/>
            <ImageCard2 checked={checked}/>
        </div>
    )
}