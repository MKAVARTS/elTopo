import React, { Component } from 'react';
import ElTopo from './pictures/elTopo.jpg';
import './App.css';

class Info extends Component {

    render (){
        return (
            <div className='container'>
                <div className='row mb-5'>
                    <h3 className='hoverable' onClick={this.props.goBack} >back </h3>
                </div>
                <div id='elTopoContainer' className = 'row align-items-center align-content-center mb-5'>
                        
                        <h1 id="elTopo">el topo </h1>
                        <p className='align-self-center ml-3' style={{backgroundColor: 'red'}}> IS AARON HARMON AND JORDAN REYES </p>
                        <p style={{maxWidth: '75%'}}>El Topo is a deeply dark and cerebral production duo from Nashville. The music celebrates the underpinned intricacies of techno and club music. Known for their productions as BASECAMP, the duo has diverged from vocal-centric tracks to create El Topo’s signature blend of sound design and club influences.<br></br>

                        <span id='elTopoEmail'> E : eltopo@gmail.com</span></p>
                        <img className='img-fluid' id='elTopoImage' src={ElTopo} alt={'promotional'}/>
                </div>
            </div>
        )
    }
}

export default Info;