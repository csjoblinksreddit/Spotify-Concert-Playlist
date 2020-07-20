import React, {Component} from 'react';
import {Button, Input, Form} from 'reactstrap';

class Artists extends Component{
    constructor(props){
        super(props);
        this.state={
            loaded: false,
            concerts: [],
            artists: [],
            isSubmitted: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    componentDidMount()
    {
        const api_key = process.env.REACT_APP_API_KEY;
        const zipCode = this.props.zip;
        const genreCodes = this.props.genreCodes;
        var genreString = "";
        this.props.genreCodes.forEach(genre => {
            genreString = genreString.concat(genre.concat(","));
        });
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${api_key}&genreId=${genreString}&postalCode=${zipCode}`
        fetch(url).then(
            res => res.json()).then(json => {
                this.setState({
                    loaded: true,
                    concerts: json,
                })
            });
    }
    handleSubmit = (event) =>{
        console.log(this.state.genres);
        this.setState({isSubmitted: true});
        event.preventDefault();
    }
    handleToggle = (event) =>{
        if(event.target.checked){
          this.setState({
            artists: [...this.state.artists, event.target.value]
          });
          this.setState({isSubmitted: false});
        } else{
          let remove = this.state.artists.indexOf(event.target.value);
          this.setState({
            genres: this.state.artists.filter((_,i) => i !== remove)
          }, 
            () => {
              console.log('artists', this.state.artists);
            });
            this.setState({isSubmitted: false});
        }
      }
    render(){
        var{loaded, concerts} = this.state;
        if(!loaded){
            return <div>Loading...</div>
        }
        else{
            var artistSet = new Set();
            var artistCheckbox = [];
            concerts._embedded.events.map(event => {
                artistSet.add(event.name);
            })
            artistSet.forEach(artist =>{
                artistCheckbox.push(<div>
                    <Input type="checkbox"
                        id={artist}
                        name={artist}
                        value={artist}
                        onClick={this.handleToggle}/>
                        <label for={artist}>{artist}</label>
                </div>)
            })
        }
        return <div className="App">
                
                    Choose your artists!
                    
                    <Form className="Artists" onSubmit={this.handleSubmit}>
                        {artistCheckbox}
                        <Button type="submit">Submit Artists</Button>
                    </Form>
    {this.state.isSubmitted && <div>{this.state.artists}</div>}
                
            </div>
    }
}
export default Artists;