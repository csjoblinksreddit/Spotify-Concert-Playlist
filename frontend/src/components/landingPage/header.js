import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import concertpic from '../../images/music.jpg';
import { Collapse, CssBaseline, IconButton } from '@material-ui/core';
import AppFunctions from './appFunctions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Link as Scroll } from 'react-scroll';



const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${concertpic})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100vh',
        
    },
    container: {
        textAlign: 'center'
    },
    titleText: {
        color: '#997799',
        fontSize: '4.5rem',
        fontWeight: 'bold'
        
    },
    goDown: {
        color: '#02FE8F',
        fontSize: '6rem'
    }

}));
export default function App(){
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(()=> {
        setChecked(true);
    },[]);
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Collapse 
                in={checked} 
                {...(checked ? {timeout: 1000} : {})} 
                collapsedHeight={50}
            >
                <div className={classes.container}>
                    <div className={classes.title}>
                        <h1 className={classes.titleText}>Welcome to our <br/>Playlist Maker <br/>
                        <Scroll to="appFunctions" smooth={true}>
                            <IconButton>
                                <ExpandMoreIcon className={classes.goDown}/>
                            </IconButton>
                        </Scroll>
                        </h1>
                        
                    </div>
                    
                    
                
                </div>
            </Collapse>
            <AppFunctions/>

            
        </div>
        
        );
}