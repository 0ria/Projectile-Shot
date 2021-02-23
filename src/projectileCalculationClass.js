/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 26/04/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 10, Projectile Motion.
 * Task: projectileCalculation
 * @brief programa que contiene la clase ProjectileCalculation la cual dados unos parámetros
 *     especificados por el usuario calculará los valores del tiro parabólico, pintará a uno
 *     de los canvas la trayectoria y pintará en el otro canvas los resultados del tiro
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md.
 */
'use strict';

/**
 * @class Class ProjectileCalculation 
 * @description Esta clase calcula los resultados referidos a cada tiro parabólico haciendo uso de 
 *    los datos de entrada proporcionados por el usuario y pinta la trayectoria en la gráfica.
 */
class ProjectileCalculation {
  /**
   * 
   * @param {Number} velocity Velocidad inicial que tendrá el proyectil
   * @param {Number} angle Ángulo inicial desde el cuál se lanzará
   * @param {boolean} checked Booleano el cual si está a true hará que el tiro se pinte al canvas
   * @param {Number} height Altura inicial desde la cuál se lanza el proyectil
   */
  constructor(velocity = 100, angle = 70, checked = true, height = 0) {
    this.initialVelocity = velocity;
    this.initialAngle = angle;
    this.isChecked = checked;
    this.gravity = 9.81;
    this.initialHeight = height;
  }
  /* istanbul ignore next */
  /**
   * @description Método que pinta en el canvas los resultados del tiro realizado
   */
  printElements() {
    CTXL.font = "20px Arial";
    CTXL.clearRect(0, 0, CANVASLEFT.width, CANVASLEFT.height);
    CTXL.fillText("Max height: " + this.maxHeight.toFixed(3) + " meters", 10, 200);
    CTXL.fillText("Time to reach max height: " + this.timeToReachMaxHeight.toFixed(3) + " seconds", 10, 230);
    CTXL.fillText("Total width reach: " + this.totalReach.toFixed(3) + " meters", 10, 260);
    CTXL.fillText("Time to reach max width: " + this.finalTime.toFixed(3) + " seconds", 10, 290);
  }
  /**
   * 
   * @param {Number} a  
   * @param {Number} b 
   * @param {Number} c 
   * @description Método que resuelve una ecuación de segundo grado
   * @returns Number con el resultado de dicha ecuación
   */
  solveEquation(a, b, c) {
    const result = (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    const result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
    if(result > result2) {
      return result;
    }
    else return result2;
  }
  /**
   * @description Método que calcula:
   *     - Altura Máxima alcanzada
   *     - Tiempo en alcanzar altura máxima
   *     - Total recorrido hasta tocar el suelo
   *     - Tiempo en alcanzar el total recorrido
   *     Siguiendo las ecuaciones del movimiento rectilínea uniformemente acelerado
   */
  calculateElements() {
    this.timeToReachMaxHeight = (this.initialVelocity * Math.sin(this.initialAngle * Math.PI / 180)) / this.gravity;
    this.maxHeight = this.initialHeight + this.initialVelocity * this.timeToReachMaxHeight * 
        Math.sin(this.initialAngle * Math.PI / 180) - (this.gravity * Math.pow(this.timeToReachMaxHeight, 2) / 2);
    //this.finalTime = ((this.initialVelocity * Math.sin(this.initialAngle * Math.PI / 180)) / (this.gravity / 2));
    this.finalTime = this.solveEquation((-1 * this.gravity / 2), (this.initialVelocity * Math.sin(this.initialAngle * Math.PI / 180)),
        this.initialHeight);
    this.totalReach = this.initialVelocity * Math.cos(this.initialAngle * Math.PI / 180) * this.finalTime;
  }
  /**
   * @description Método que elige un color aleatorio con el que se pintará el tiro en el canvas
   */
  selectRandomRGBColor() {
    const MINCOLORVALUE = 0;
    const MAXCOLORVALUE = 254;
    let r = Math.random() * (MAXCOLORVALUE - MINCOLORVALUE) + MINCOLORVALUE;
    let g = Math.random() * (MAXCOLORVALUE - MINCOLORVALUE) + MINCOLORVALUE;
    let b = Math.random() * (MAXCOLORVALUE - MINCOLORVALUE) + MINCOLORVALUE;
    return `rgb(${r}, ${g}, ${b})`;
  }
  /**
   * 
   * @param {Array} initialPoint 
   * @param {Array} mediumPoint 
   * @description Dibuja una flecha desde el origen siguiendo la trayectoria
   *     que tomará el proyectil
   */
  drawArrow(initialPoint, mediumPoint) {
    var headlen = 15.0;
    var back = 4.0;
    var angle1 = Math.PI / 13.0;
    var angle2 = Math.atan2(mediumPoint[1] - initialPoint[1], mediumPoint[0] - initialPoint[0]);
    var diff1 = angle2 - angle1;
    var diff2 = angle2 + angle1;
    var xx = getBack(back, initialPoint[0], initialPoint[1], mediumPoint[0], mediumPoint[1]);
    var yy = getBack(back, initialPoint[1], initialPoint[0], mediumPoint[1], mediumPoint[0]);
    CTXR.lineWidth = 5
    CTXR.beginPath();
    CTXR.moveTo(initialPoint[0], initialPoint[1]);
    CTXR.lineTo(mediumPoint[0], mediumPoint[1]);

    CTXR.moveTo(xx, yy);
    CTXR.lineTo(xx - headlen * Math.cos(diff1), yy - headlen * Math.sin(diff1));

    CTXR.moveTo(xx, yy);
    CTXR.lineTo(xx - headlen * Math.cos(diff2), yy - headlen * Math.sin(diff2));
    CTXR.stroke();
  }
  /* istanbul ignore next */
  /**
   * 
   * @param {Array} array Array que contiene la trayectoria del proyectil
   * @param {String} color Color del que se pintará el tiro
   * @description Método que pinta en el canvas el tiro previamente calculado
   */
  async draw(arrayPoints, color) {
    this.drawArrow(arrayPoints[0], arrayPoints[4]);
    for(let i = 0; i < arrayPoints.length; i++) {
      if (i === 3 || i === 4) {
        continue;
      }
      else {
        await sleep(25);
        CTXR.fillStyle = color;
        CTXR.beginPath();
        CTXR.arc(arrayPoints[i][0], arrayPoints[i][1], 5, 0, Math.PI * 2);
        CTXR.fill();
      }
    }
  }
  /* istanbul ignore next */
  /**
   * 
   * @param {Number} width Ancho del cavnas 
   * @param {Number} height Alto del canvas
   * @description Método que calcula la posición del tiro en distintos instantes del tiempo,
   *     la almacena en un array y la manda a pintar al método draw()
   */
  printArc(width, height) {
    let offsetX = width * 0.05;
    let offsetY = height * 0.075;
    const TIMEITERATOR = 0.25;
    let time = 0;
    let trajectoryArray = [];
    let x = Math.round(this.initialVelocity * Math.cos(this.initialAngle * Math.PI / 180) * this.timeToReachMaxHeight);
    let y = Math.round(this.initialHeight + this.initialVelocity * Math.sin(this.initialAngle * Math.PI / 180) * this.timeToReachMaxHeight -
        (this.gravity * Math.pow(this.timeToReachMaxHeight, 2)) / 2);
    let initalPoint = [offsetX, height - offsetY - this.initialHeight];
    let maxHeightPoint = [x + offsetX, height - offsetY - y];
    let lastPoint = [this.totalReach + offsetX, height - offsetY + this.maxHeight];
    trajectoryArray.push(initalPoint);
    trajectoryArray.push(maxHeightPoint);
    trajectoryArray.push(lastPoint);
    
    if (this.isChecked == true) {
      while (height - offsetY - y < height - offsetY) {
        time += TIMEITERATOR;
        x = Math.round(this.initialVelocity * Math.cos(this.initialAngle * Math.PI / 180) * time);
        y = Math.round(this.initialHeight + this.initialVelocity * Math.sin(this.initialAngle * Math.PI / 180) * time -
        (this.gravity / 2) * Math.pow(time, 2));
        let point = [x + offsetX, height - offsetY - y];
        trajectoryArray.push(point);
      }
      if (trajectoryArray[trajectoryArray.length - 1][1] > height - offsetY) {
        trajectoryArray.pop();
      }
    }
    this.draw(trajectoryArray, this.selectRandomRGBColor());
  }
}
/* istanbul ignore next */
/**
 *
 * @param {Number} msToWait
 * @description Función que hace que el programa espere el tiempo indicado
 */
function sleep(msToWait) {
  return new Promise(resolve => setTimeout(resolve, msToWait));
}
/**
 * 
 * @param {Number} len 
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @description Retorna el punto central de la cabeza de la flecha
 */
function getBack(len, x1, y1, x2, y2) {
  return x2 - (len * (x2 - x1) / (Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))));
}

if (typeof exports !== 'undefined') {
  exports.ProjectileCalculation = ProjectileCalculation;
}