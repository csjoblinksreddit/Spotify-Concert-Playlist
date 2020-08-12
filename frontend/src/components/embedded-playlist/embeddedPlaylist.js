import React from 'react';
import Iframe from 'react-iframe'

const EmbeddedPlaylist = (props) => {
    return(
        <div id="iframe-container">
                <Iframe
                    url={props.link}
                    width="350px"
                    height="450px"
                    id={props.key}
                    display='initial'
                    position="relative"
                />
        </div>
    )
}

export default EmbeddedPlaylist