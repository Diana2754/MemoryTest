import React, {useState} from "react";
import "./Carta.css";
import FlipCard from "react-card-flip";
import logo from "./logo/logo.png";


const Carta = ({imagen, estaVolteada, fueAdivinada, seleccionarCarta}) => {

 

  const handleClick=()=>{
    if (!fueAdivinada){
      seleccionarCarta();
    }
   
   
  }

    return (
      <div className="elemento-carta" onClick={handleClick}>
        <FlipCard 
        isFlipped={estaVolteada|| fueAdivinada} 
        flipDirection="horizontal">

          <div className="portada">
          <img src={logo} alt="Portada" />
          </div>
          <div className="contenido">
           <img src={imagen} alt="Carta" />
          </div>
        </FlipCard>
        
      </div>
    );
  }
  
  export default Carta;