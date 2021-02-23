/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 26/04/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 10, Projectile Motion.
 * Task: projectileMotion
 * @brief programa principal de la tarea.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P10-Projectile/blob/master/2019-2020_p10_Projectile.md.
 */
'use strict';

const CANVASRIGHT = document.getElementById('myCanvasRight');
const CTXR = CANVASRIGHT.getContext('2d');
const CANVASLEFT = document.getElementById('myCanvasLeft');
const CTXL = CANVASLEFT.getContext('2d');
const CANVASHEIGHT = parseInt(CANVASRIGHT.height, 10);
const CANVASWIDTH = parseInt(CANVASRIGHT.width, 10);
const SPACEPERCENTAGE = 0.1;
let firstGraphic = true;

/**
 * @description Método principal del programa el cual se llama cada vez que se hace
 *     click en calcular del html.
 */
function main() {
  let INITIALVELOCITY = parseInt(document.getElementById('velocity').value, 10);
  let INITIALANGLE = parseInt(document.getElementById('angle').value, 10);
  let INITIALHEIGHT = parseInt(document.getElementById('height').value, 10);;
  let CHECKEDBOX = document.getElementById('show').checked;
  let plane;
  if (firstGraphic) {
    firstGraphic = false;
    let calculus = new ProjectileCalculation(INITIALVELOCITY, INITIALANGLE, CHECKEDBOX, INITIALHEIGHT);
    calculus.calculateElements();
    calculus.printElements();
    calculus.printArc(CANVASWIDTH, CANVASHEIGHT);
    //console.log('total reach: ' + calculus.totalReach);
    plane = new Plane(CANVASWIDTH, CANVASHEIGHT, Math.round(calculus.totalReach + calculus.totalReach * SPACEPERCENTAGE));
    plane.drawPlane();
  }
  else {
    let calculus = new ProjectileCalculation(INITIALVELOCITY, INITIALANGLE, CHECKEDBOX, INITIALHEIGHT);
    calculus.calculateElements();
    calculus.printElements();
    calculus.printArc(CANVASWIDTH, CANVASHEIGHT);
  }
}