import React, {Component} from 'react';
import './Genres.css';
import {Button, Input, Form, Col, Container} from 'reactstrap'
import Artists from '../Artists';
import { Row } from 'antd';

class Genres extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      loaded: false,
      concerts: [],
      isSubmitted: false,
      genres: []
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const api_key = process.env.REACT_APP_API_KEY;
    const zipCode = this.props.zip;
    console.log(this.props.zip);
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${api_key}&postalCode=${zipCode}`;
    console.log(url);
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
        genres: [...this.state.genres, event.target.value]
      });
      this.setState({isSubmitted: false});
    } else{
      let remove = this.state.genres.indexOf(event.target.value);
      this.setState({
        genres: this.state.genres.filter((_,i) => i !== remove)
      }, 
        () => {
          console.log('genres', this.state.genres);
        });
        this.setState({isSubmitted: false});
    }
  }
 
  render(){
    var{loaded, concerts} = this.state;
    if(!loaded)
    {
      console.log(concerts);
      return <div>Loading...</div>
    }
    else if(parseInt(concerts.page.totalElements) == 0){
      return <div>There are no concerts in your area</div>;
    }
    else{
      const genreSet = new Set();
      const genreCheckboxes = [];
      
      //Add all genres and subgenres to genreName and genreID set
      concerts._embedded.events.map(event => {
          //Add genre names and genreIDs
          genreSet.add(event.classifications[0].genre.name.concat("|".concat(event.classifications[0].genre.id)));
          //genreSet.add(event.classifications[0].subGenre.name.concat("|".concat(event.classifications[0].subGenre.id)));

       });

      genreSet.forEach(genre => {
        genreCheckboxes.push(<div>
          <Input type="checkbox" 
            id={genre.split("|")[0]} 
            name={genre.split("|")[0]} 
            value={genre.split("|")[1]}
            onClick={this.handleToggle}/>
             <label for={genre.split("|")[0]}> {genre.split("|")[0]}</label>
          </div>)
      })
      return (
        <div className="App">
        
         
                Choose your genres!
                <Form className="Genres" onSubmit={this.handleSubmit}>              
                  {genreCheckboxes}
                  <Button type="submit">Submit Genres</Button>
                </Form>
              
                {this.state.isSubmitted && <Col><Artists genreCodes= {this.state.genres} zip = {this.props.zip}/></Col>}
           
           
        </div>
      );
    }
  }   
}

export default Genres;