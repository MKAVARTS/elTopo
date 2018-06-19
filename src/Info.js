import React, { Component } from 'react';
import ElTopo from './pictures/elTopo.jpg';

class Info extends Component {

    render (){
        return (
            <div>
                <p className='hoverable' onClick={this.props.goBack} >back </p>
                <h1>el topo </h1>
                <p> IS AARON HARMON AND JORDAN REYES </p>
                <p>El Topo is a deeply dark and cerebral production duo from Nashville. The music celebrates the underpinned intricacies of techno and club music. Known for their productions as BASECAMP, the duo has diverged from vocal-centric tracks to create El Topo’s signature blend of sound design and club influences.  </p>
                <p> email : eltopo@gmail.com </p>
                <img className='img-fluid' id='elTopo' src={ElTopo} />
            </div>
        )
    }
}

export default Info;