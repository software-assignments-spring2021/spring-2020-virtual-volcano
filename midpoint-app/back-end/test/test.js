const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const algorithm = require("../app").algorithm;

const {expect} = chai;
chai.use(chaiHttp);

describe('Algorithm', function(){
  it('algorithm should return midpoint that is a float', function(){
    let result = algorithm();
    assert.typeOf(result, 'float');
  });
});
