import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Genres from './Genres';

export default class ZipForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      zip: '',
      isSubmitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => 
  {
    this.setState({zip: event.target.value});
    this.setState({isSubmitted: false});
  }
  handleSubmit = (event) =>{
    this.setState({isSubmitted: true});
    event.preventDefault();
  }
  render() {
    return (
      <div className="App">
      Enter a zipcode
      <Form className ="ZipForm" onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="zipcode"></Label>
            <Input type="text" value={this.state.zip} onChange={this.handleChange} id="zipcodeInput" placeholder="Enter Zipcode" />
        </FormGroup>
      <Button type ="submit" value={this.state.zip} placeholder="submit">Submit</Button>
    </Form>
    {this.state.isSubmitted && <Genres zip = {this.state.zip}/>}
    </div>
  );
  }

}