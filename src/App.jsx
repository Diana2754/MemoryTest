import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Tablero from './Tablero';
import ConstruirBaraja from './utils/ConstruirBaraja';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baraja: [],
      parejaSeleccionada: [],
      estaSiendoComparada: false, // Inicialmente vacío hasta que se carguen las imágenes
    };

    // Enlazamos los métodos al contexto de la clase
    this.seleccionarCarta = this.seleccionarCarta.bind(this);
    this.compararPareja = this.compararPareja.bind(this);
  }

  async componentDidMount() {
    const baraja = await ConstruirBaraja(); // Espera a que se cargue la baraja

    
    this.setState({ baraja }); // Actualiza el estado con la baraja cargada
  }

  seleccionarCarta(carta) { 
    if (this.state.estaComparando ||
      this.state.parejaSeleccionada.includes(carta) || carta.fueAdivinada) {
      return;
    }

    const baraja = this.state.baraja.map((c) => 
      c.id === carta.id ? { ...c, estaVolteada: true } : c
    );

    const parejaSeleccionada = [...this.state.parejaSeleccionada, carta];


    if (parejaSeleccionada.length === 2) {
      this.compararPareja(parejaSeleccionada, baraja);
    }

    this.setState({
      baraja,
      parejaSeleccionada,
    });
  }

  compararPareja(parejaSeleccionada, nuevaBaraja) {
    this.setState({ estaComparando: true});

    setTimeout(() => {
      const [primeraCarta, segundaCarta] = parejaSeleccionada;
      let baraja = nuevaBaraja;

      if (primeraCarta.imagen === segundaCarta.imagen) {
        baraja = baraja.map((carta) =>
          carta.imagen === primeraCarta.imagen
            ? { ...carta, fueAdivinada: true, estaVolteada:true}
            : carta
        );
      } else {
        // Si no coinciden, darles la vuelta
        baraja = baraja.map((carta) =>
          carta.id === primeraCarta.id || carta.id === segundaCarta.id
            ? { ...carta, estaVolteada: false }
            : carta
        );
      }

      // Se ejecuta siempre, incluso si las cartas son diferentes
      this.setState({
        parejaSeleccionada: [],
        baraja,
        estaComparando: false,
      });
    }, 1000);

 
  }

  render() {
    return (
      <>
        <Header />
        <Tablero 
          baraja={this.state.baraja} 
          parejaSeleccionada={this.state.parejaSeleccionada}
          seleccionarCarta={this.seleccionarCarta} // Pasamos el método correctamente
        />
      </>
    );
  }
}

export default App;