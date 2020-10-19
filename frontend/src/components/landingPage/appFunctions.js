import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Appbar, IconButton} from '@material-ui/core';
import ImageCard from './ImageCard';
import ImageCard2 from './ImageCard2';
import {Link as Scroll } from 'react-scroll';
import playlistPage from "../normal-playlist/playlist";



const useStyles = makeStyles((theme) => ({
    root:{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100vh',
        
    },

}));
export default function Header(){
    const classes = useStyles();
    return(
        <div className={classes.root} id="appFunctions">
            
            <ImageCard/>
            <ImageCard2/>
        </div>
    )
}