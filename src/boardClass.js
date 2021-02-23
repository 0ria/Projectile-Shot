/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 26/04/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 10, Projectile Motion.
 * Task: board-number
 * @brief programa principal de la tarea.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md.
 */
'use strict';

/**
 * @class Clase box respresenta cada casilla del tablero 
 * @description Cada casilla tiene un atributo privado con su número
 */
class Box {
  /**
   * 
   * @param {Number} posx Coordenadas de X 
   * @param {Number} posy Coordenadas de Y
   * @param {Number} size Tamaño de la casilla
   */
  constructor(posx, posy, size) {
    this.posX = posx;
    this.posY = posy;
    this.size = size;
    this.number = 0;
  }
  /**
   * @description Método que retorna el valor del centro de la casilla
   */
  getCenter() {
    return (this.size / 4)
  }
  /**
   * @description Método que dibuja cada casilla
   */
  draw() {
    CTX.beginPath();
    CTX.strokeStyle = 'black';
    CTX.rect(this.posX, this.posY, this.size ,this.size);
    CTX.stroke();
  }
  /**
   * @description Método que dibuja el número del centro de cada casilla
   */
  drawNumber() {
    CTX.beginPath();
    CTX.font = "120px Arial";
    CTX.fillStyle = 'black',
    CTX.fillText(this.number, this.posX + this.getCenter(), this.posY - this.getCenter() / 2);
    CTX.stroke();
  }
  /**
   * @description Método que limpia cada casilla del canvas
   */
  clearNumber() {
    CTX.clearRect(this.posX + 10, this.posY + 10, 85, 95);
  }
  /**
   * @description Método que cambia el número de la casilla por otro aleatorio
   */
  changeNumber() {
    const MINNUMBER = 0;
    const MAXNUMBER = 9;
    this.clearNumber();
    this.number = Math.round(Math.random() * (MAXNUMBER - MINNUMBER) + MINNUMBER);
    this.drawNumber();
  }
  /**
   * @description Método que pinta de amarillo una casilla
   */
  makeItYellow() {
    this.clearNumber();
    CTX.beginPath();
    CTX.fillStyle = 'yellow';
    CTX.fillRect(this.posX + 2, this.posY + 2, this.size - 4, this.size - 4);
    CTX.fill();
    this.drawNumber();
  }
}

/**
 * @class Clase Tablero
 * @description Contiene un atributo privado con un array de casillas
 *     que representa el tablero
 */
class Board {
  /**
   * 
   * @param {Number} totalWidth Ancho del canvas
   * @param {Number} totalHeight Alto del canvas
   * @param {Number} boxsize Tamaño de cada casilla
   */
  constructor(totalWidth, totalHeight, boxsize) {
    this.sizeX = totalWidth;
    this.sizeY = totalHeight;
    this.eachBoxSize = boxsize;
    this.boxArray = [];
  }
  /**
   * @description Crea el tablero y lo dibuja al canvas haciendo
   *     uso del metodo draw y drawNumber de la clase Box. Aparte
   *     pushea cada box dentro de un array de manera que el tablero
   *     queda almacenado en la clase Board
   */
  createBoard() {
    let posXini = 0;
    let posYini = 0;
    for (let i = 0; i < this.sizeY; i += this.eachBoxSize) {
      for (let j = 0; j < this.sizeX; j += this.eachBoxSize) {  
      let box = new Box(i , j, this.eachBoxSize);
      this.boxArray.push(box);
      box.draw();
      box.drawNumber();
      }
    }
  }
  /**
   * @description Cambia el número de cada casilla
   */
  shuffle() {
    for (let box of this.boxArray) {
      box.changeNumber();
    }
    // this.boxArray[3].makeItYellow(); // Esta sentencia se puede descomentar para pintar una casilla de amarillo
  }
  /**
   * @description Método que chequea si el mismo número se repite
   *     más de cuatro veces en cada casilla
   */
  checkEachColumn() {
    const FOUREQUALNUMBERS = 4;
    const ROWS = 6;
    const COLUMNS = 7;
    let found = false;
    for (let i = 1; i < this.boxArray.length; i += COLUMNS) {
      //console.log(this.boxArray.length);
      let arrayAux = [];
      for (let j = 0; j < ROWS; j++) {
        arrayAux.push(this.boxArray[i + j].number);
        //console.log('columna' + i + ' valor ' + this.boxArray[i + j].number);
      }
      let actualNum = arrayAux[0];
      for (let i = 0; i < arrayAux.length - 1; i++) {
        let counter = 1;
        if (actualNum === arrayAux[i + 1]) {
          counter++;
          if (counter == FOUREQUALNUMBERS) {
            found = true;         
          }
        }
        else {
          actualNum = arrayAux[i + 1];
        }
      }
      arrayAux = [];
    }
    //console.log(found);
    return found;
  }
  checkSameNumber() {
    this.checkEachColumn();
    //checkEachColumn();
    //checkEachDiagonal();
  }
}