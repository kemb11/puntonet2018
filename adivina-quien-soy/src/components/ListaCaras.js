import React, { Component } from 'react';
import './css/listaCaras.css';
import Cabecera from './Cabecera';

class ListaCaras extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var names = ['http://www4.pictures.zimbio.com/gi/Diego+Forlan+Colombia+v+Uruguay+Round+16+2014+CVeEiRf1a6nl.jpg', 'http://www4.pictures.zimbio.com/gi/Diego+Forlan+Colombia+v+Uruguay+Round+16+2014+CVeEiRf1a6nl.jpg', 'http://www4.pictures.zimbio.com/gi/Diego+Forlan+Colombia+v+Uruguay+Round+16+2014+CVeEiRf1a6nl.jpg', 'http://www4.pictures.zimbio.com/gi/Diego+Forlan+Colombia+v+Uruguay+Round+16+2014+CVeEiRf1a6nl.jpg', 'http://www4.pictures.zimbio.com/gi/Diego+Forlan+Colombia+v+Uruguay+Round+16+2014+CVeEiRf1a6nl.jpg', 'http://www4.pictures.zimbio.com/gi/Diego+Forlan+Colombia+v+Uruguay+Round+16+2014+CVeEiRf1a6nl.jpg', 'http://www4.pictures.zimbio.com/gi/Diego+Forlan+Colombia+v+Uruguay+Round+16+2014+CVeEiRf1a6nl.jpg', 'http://www4.pictures.zimbio.com/gi/Diego+Forlan+Colombia+v+Uruguay+Round+16+2014+CVeEiRf1a6nl.jpg'];
    var namesList = names.map(function(rutaImg){ 
                    return <div className="itemCara" ><img src={rutaImg} /></div>;
                  });    

    return (
      <div className="ListaCaras row">
        <div id="contenedorCaras">
         {namesList} 
        </div>
      </div>
    );
  }
}

export default ListaCaras;