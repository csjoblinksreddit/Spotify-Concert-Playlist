import React, { Component} from 'react';
import './Genres.css';

require('dotenv').config();

class Genres extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      loaded: false,
      concerts: []
    };
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
          concerts: json
        })
      });
    
  }
  render(){
    var{loaded, concerts} = this.state;
    console.log(concerts.length);
    if(!loaded)
    {
      console.log(concerts);
      return <div>Loading...</div>
    }
    else if(parseInt(concerts.page.totalElements) == 0){
      return <div>There are no concerts in your area</div>;
    }
    else{
      const set1 = new Set();
      concerts._embedded.events.map(event => (
          set1.add(event.classifications[0].genre.name)
       ));
      concerts._embedded.events.map(event => (
        set1.add(event.classifications[0].subGenre.name)
      ));
      const listItems2 = [];

      set1.forEach(genre => {
        listItems2.push(<div><input type="checkbox" id={genre} name={genre} value={genre}></input><label for={genre}> {genre}</label></div>)
      })
      return (
        <div className="App">
          <header className="App-header">
            
            Select which genres you would like in your playlist
            <form>              
              {listItems2}
            </form>
            <br></br>
          </header>
          
        </div>
        
      );
    }
  }   
}

export default Genres;
