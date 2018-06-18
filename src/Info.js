import React, { Component } from 'react';
import ElTopo from './pictures/elTopo.jpg';

class Info extends Component {

    render (){
        return (
            <div>
                <p className='hoverable' onClick={this.props.goBack} >back </p>
                <h1>el topo </h1>
                <p> IS AARON HARMON AND JORDAN REYES </p>
                <p> email : eltopo@gmail.com </p>
                <img className='img-fluid' id='elTopo' src={ElTopo} />
            </div>
        )
    }
}

export default Info;