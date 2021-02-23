/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 26/04/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 10, Projectile Motion.
 * Task: axesClass
 * @brief programa que contiene la clase Plane, Axis y Line las cuales calcularán los distintos valores de
 *     los mismos y la clase línea pintará al canvas.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md.
 */
'use strict';
/**
 * @class Clase Linea
 * @description Encargada de dibujar todas las líneas que se verán en el canvas
 *     y de ponerle los respectivos número a la gráfica
 */
class Line {
  /**
   * 
   * @param {Array} firstPosition Primera posición de la línea 
   * @param {Array} secondPosition Segunda posición de la línea
   * @param {Number} number Número para la gráfica en caso de llevarlo
   */
  constructor(firstPosition, secondPosition, number) {
    this.posX = firstPosition;
    this.posY = secondPosition;
    this.number = number;
  }
  /* istanbul ignore next */
  /**
   * @description Método que dibuja una línea
   */
  draw() {
    CTXR.strokeStyle = 'black';
    CTXR.lineWidth = '3';
    CTXR.beginPath();
    CTXR.moveTo(this.posX[0], this.posX[1]);
    CTXR.lineTo(this.posY[0], this.posY[1]);
    if (this.number !== undefined) {
      CTXR.font = "17px Arial";
      CTXR.fillText(this.number, this.posY[0] - 10, this.posY[1] + 20);
    }
    CTXR.closePath();
    CTXR.stroke();
  }
}

/**
 * @class Clase eje
 * @description Clase que almacena la información de cada eje y usa
 *     la clase línea para dibujar sus distintas partes
 */
class Axis {
  /**
   * 
   * @param {Array} AxisCoords Coordenadas de inicio y final del eje
   * @param {Array} markArray Array con datos que resultarán útiles para
   *     hacer distintos cálculos
   */
  constructor(AxisCoords, markArray) {
    this.AxisCoords = new Line(AxisCoords[0], AxisCoords[1]);
    this.offsetX = markArray[2];
    this.offsetY = markArray[3];
    this.xSize = markArray[0];
    this.ySize = markArray[1];
    this.max = markArray[4];
    this.separationBetweenLinesX = this.xSize / 50;
    this.separationBetweenLinesY = this.ySize / 30;
  }
  /* istanbul ignore next */
  /**
   * @description Método que dibuja los segmentos del eje X.
   *     Cada 5 segmentos dibuja uno más grande y le añade un número
   */
  drawXMarks() {
    let maxLines = Math.floor(this.xSize / this.separationBetweenLinesX);
    let metersPerLine = this.max / maxLines;
    let counter = 0;
    for (let i = 0; i <= this.xSize; i += metersPerLine) {
        if (counter % 5 === 0) {
          let line = new Line([i + this.offsetX, this.offsetX + 5 + this.ySize], [i + this.offsetX, this.offsetX + 30 + this.ySize], (counter * metersPerLine).toFixed(0));
          line.draw();
        }
        else {
          let line = new Line([i + this.offsetX, this.offsetX + 5 + this.ySize], [i + this.offsetX, this.offsetX + 15 + this.ySize]);
          line.draw();
        }
        counter++;
    }
  }
  /* istanbul ignore next */
  /**
   * @description Método que dibuja los segmentos del eje Y.
   *     Cada 5 segmentos dibuja uno más grande y le añade un número
   */
  drawYMarks() {
    let maxLines = Math.floor(this.xSize / this.separationBetweenLinesX);
    let metersPerLine = this.max / maxLines;
    let counter = 0;
    for (let i = this.ySize; i >= 0; i -= metersPerLine) {
        if (counter % 5 === 0) {
          let line = new Line([this.offsetX , i + this.offsetY], [this.offsetX - 30, i + this.offsetY], (counter * metersPerLine).toFixed(0));
          line.draw();
        }
        else {
          let line = new Line([this.offsetX - 10, i + this.offsetY], [this.offsetX, i + this.offsetY]);
          line.draw();
        }
        counter++;
    }
  }
  /* istanbul ignore next */
  /**
   * @description Método que invoca a los dos que dibujan los segmentos
   *    de manera que quede mas ordenado
   */
  drawMarks() {
    this.drawXMarks();
    this.drawYMarks();
  }
  /* istanbul ignore next */
  /**
   * @description Método que, dibuja el eje haciendo uso del constructor de línea
   *     y llama al método de dibujar los segmentos
   */
  drawAxis() {
    this.AxisCoords.draw();
    this.drawMarks();
  }
}

/**
 * @class Clase plano la cual contiene los dos ejes que se pintarán en el canvas
 */
class Plane {
  /**
   * 
   * @param {Number} width Tamaño del ancho del canvas
   * @param {Number} height Tamaño del alto del canvas
   * @param {Number} maxValues Número del primer cálculo que se usará
   *     para reescalar la gráfica
   */
  constructor(width = 800, height = 800, maxValues = 100) {
    this.size = [width, height];
    this.offsetX = width * 0.05;
    this.offsetY = height * 0.075;
    this.xAxisSize = this.size[0] - this.offsetX * 2; // Tamaño que tendrá el eje X (en px)
    this.yAxisSize = this.size[1] - this.offsetY * 2; // Tamaño que tendrá el eje Y (en px)
    this.lines = maxValues;
    this.marksArray = [this.xAxisSize, this.yAxisSize, this.offsetX, this.offsetY, this.lines];
    this.xAxis = new Axis([[0 + this.offsetX, this.size[1] - this.offsetY], [this.size[0] - this.offsetX, this.size[1] - this.offsetY]], this.marksArray);
    this.yAxis = new Axis([[0 + this.offsetX, this.size[1] - this.offsetY], [0 + this.offsetX, 0 + this.offsetY]], this.marksArray);
  }
  /* istanbul ignore next */
  /**
   * @description Método que manda a pintar ambos ejes al canvas
   */
  drawPlane() {
    this.xAxis.drawAxis();
    this.yAxis.drawAxis();
  }
}

if (typeof exports !== 'undefined') {
  exports.Line = Line;
  exports.Axis = Axis;
  exports.Plane = Plane;
}