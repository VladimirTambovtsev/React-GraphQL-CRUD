import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';



import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
	render() {
		const { song } = this.props.data;
		console.log(song);
		if (!song) { return <div>Loading...</div>; }
		return (
			<div className="container" style={{marginTop: '10px'}}>
				<Link to="/">Back</Link>
				<h3>{song.title}</h3>
				<LyricList lyrics={song.lyrics} />
				<LyricCreate songId={this.props.params.id}  />
			</div>
		)
	}
}


const songDetail = gql`
	query SongQuery($id:ID!) {
	  song(id:$id) {
	    id
	    title
	    lyrics {
	    	id
	    	content
	    	likes
	    }
	  }
	}
`;



export default graphql(songDetail, {
	options: (props) => { 
		return { 
			variables: { 
				id: props.params.id 
			} 
		} 
	}
})(SongDetail);



