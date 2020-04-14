const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
//const algorithm = require("../app").algorithm;

const {expect} = chai;
chai.use(chaiHttp);

describe("Algorithm", function(){
  it('algorithm should return midpoint that is a float', function(){
    chai
    let result = algorithm();
    assert.typeOf(result, 'float');
  });
  
  describe("Login", () => {
  it("Sends a 200 code when user information is passed", done => {
    chai
      .request(app)
      .post("/login")
      .send({email: "testEmail", password: "testPass"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
});
