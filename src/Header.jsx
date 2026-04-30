import React, {Component} from 'react';

export default class extends Component{

    render(){
        return(
            <header>
                <div className='titulo'>React Memory-Test</div>
                <button className='boton-reinicio'>Reiniciar</button>
            </header>
        )
    }
}