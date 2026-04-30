import React, { Component } from "react";
import "./Tablero.css";
import Carta from "./Carta";

export default class Tablero extends Component{

    render(){
        const { baraja = [], estaSiendoComparada } = this.props || []; 
        return(
            <div className="tablero">
              
                 {baraja.map((carta, index) => (   // Corrección aquí: (carta, index)
                    <Carta 
                    key={index} imagen={carta.icono} 
                    estaSiendoComparada={estaSiendoComparada}
                    seleccionarCarta={()=> this.props.seleccionarCarta(carta)}
                    fueAdivinada={carta.fueAdivinada}/>  // Usamos carta.icono en lugar de Carta.icono
          ))
        }
            </div>
        )
    }
}
