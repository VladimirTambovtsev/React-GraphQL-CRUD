import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
	      value: ''
		};
		this.onChange = this.onChange.bind(this);
    	this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({value: event.target.value});
	}

	onSubmit(event) {
		event.preventDefault();
		if (this.state.value != '') {
			this.props.mutate({
				variables: {
					content: this.state.value,
					songId: this.props.songId
				}
			}).then(() => this.setState({ value: '' }));
		}
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} style={{marginTop: "30px"}}>
				<label htmlFor="textarea1">Textarea</label>
				<textarea htmlFor="textarea1" value={this.state.value} className="materialize-textarea" onChange={this.onChange} />
       			<input type="submit" className="btn" value="Add" />
			</form>
		)
	}
}


const mutation = gql`
	mutation AddLyricToSong($content:String, $songId:ID) {
	  addLyricToSong(content:$content, songId:$songId) {
	    id
	    lyrics {
			id
	    	content
	    	likes
	    }
	  }
	}
`;

export default graphql(mutation)(LyricCreate);


