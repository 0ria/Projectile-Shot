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

const CANVAS = document.getElementById('myCanvas');
const CTX = CANVAS.getContext('2d');
const BOXSIZE = CANVAS.width / 7;
let board;

function main() {
  board = new Board(CANVAS.width, CANVAS.height, BOXSIZE);
  board.createBoard();
}

function resolve() {
  board.shuffle();
  board.checkSameNumber();
}

main();