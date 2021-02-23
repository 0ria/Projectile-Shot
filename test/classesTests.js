/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 20/04/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 9, Random Walk.
 * Task: gridTests
 * @brief programa que trata de imitar una imagen dada.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P09-RandomWalk/blob/master/2019-2020_p09_RandomWalk.md.
 */
'use strict';

let expect;
let LineClass;
let AxisClass;
let PlaneClass;
let ProjectileClass;

if (typeof require !== 'undefined') {
  LineClass = require('../src/axesClass.js').Line;
  AxisClass = require('../src/axesClass.js').Axis;
  PlaneClass = require('../src/axesClass.js').Plane;
  ProjectileClass = require('../src/projectileCalculationClass.js').ProjectileCalculation;
  expect = require('chai').expect;
}
else {
  LineClass = Line;
  AxisClass = Axis;
  PlaneClass = Plane;
  ProjectileClass = ProjectileCalculation;
  expect = chai.expect;
}


//const assert = chai.expect;
//const expect = chai.expect;

describe('Testing Line class Methods:', () => {
  let line;
  it('Testing constructor.', function() {
    let posX = [10, 10];
    let posY = [20, 20];
    line = new LineClass(posX, posY, 10);
    expect(line.posX).to.eql([10, 10]);
    expect(line.posY).to.eql([20, 20]);
    expect(line.number).to.equal(10);
  });
});

describe('Testing Axis class Methods:', () => {
  let axis;
  beforeEach(function() {
    let posX = [10, 10];
    let posY = [20, 20];
    let parameters = [1, 2, 3, 4, 5];
    let arrayPoints = [];
    arrayPoints.push(posX);
    arrayPoints.push(posY);
    axis = new AxisClass(arrayPoints, parameters);
  });
  it('Testing constructor.', function() {
    expect(axis.xSize).to.equal(1);
    expect(axis.ySize).to.equal(2);
  });
  it('Testing separation between X lines', function() {
    expect(axis.separationBetweenLinesX).to.equal(1 / 50);
  })
  it('Testing separation between Y lines', function() {
    expect(axis.separationBetweenLinesY).to.equal(2 / 30);
  })
});

describe('Testing Plane class Methods:', () => {
  let plane;
  beforeEach(function() {
    plane = new PlaneClass(1000, 1200, 50);
  });
  it('Testing constructor default parameters.', function() {
    plane = new PlaneClass;
    expect(plane.size[0]).to.equal(800);
    expect(plane.size[1]).to.equal(800);
    expect(plane.lines).to.equal(100);
  });
  it('Testing constructor specified values', function() {
    expect(plane.size[0]).to.equal(1000);
    expect(plane.size[1]).to.equal(1200);
    expect(plane.lines).to.equal(50);
  })
  it('Testing X axis length calculation', function() {
    expect(plane.xAxisSize).to.equal(1000 - plane.offsetX * 2)
  })
  it('Testing Y axis length calculation', function() {
    expect(plane.yAxisSize).to.equal(1200 - plane.offsetY * 2)
  })
});

describe('Testing ProjectileCalculation class Methods:', () => {
  let motion;
  beforeEach(function() {
    motion = new ProjectileClass(900, 10, true, 900);
  });
  it('Testing constructor default parameters.', function() {
    motion = new ProjectileClass;
    expect(motion.initialVelocity).to.equal(100);
    expect(motion.initialAngle).to.equal(70);
    expect(motion.initialHeight).to.equal(0);
    expect(motion.isChecked).to.equal(true);
    expect(motion.gravity).to.equal(9.81);
  });
  it('Testing constructor specified values', function() {
    expect(motion.initialVelocity).to.equal(900);
    expect(motion.initialAngle).to.equal(10);
    expect(motion.initialHeight).to.equal(900);
    expect(motion.isChecked).to.equal(true);
    expect(motion.gravity).to.equal(9.81);
  })
  it('Testing calculateElements method', function() {
    let time = (motion.initialVelocity * Math.sin(motion.initialAngle * Math.PI / 180)) / motion.gravity;
    let height = motion.initialHeight + motion.initialVelocity * time * 
        Math.sin(motion.initialAngle * Math.PI / 180) - 0.5 * motion.gravity * Math.pow(time, 2);
    motion.calculateElements();
    expect(motion.timeToReachMaxHeight).to.equal(time);
    expect(motion.maxHeight).to.equal(height);
  })
});