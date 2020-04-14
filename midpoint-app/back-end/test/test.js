const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const algorithm = require("../app").algorithm;

const {expect} = chai;
chai.use(chaiHttp);

describe("Check Lat/Lng", ()=>{
    it("returns your_data object", done=>{
        chai
            .request(app)
            .post('/')
            .send({your_data: {lat1: '40.4352', lng1: '-73.5945', lat2: '40.7275.', lng2: '-73.9890' }})
            .end((err, res) =>{
                expect(res.body.response).to.be.a('float');
                done();
            });
    });
    
    it("should log error if an error occurs", done =>{
        chai
            .request(app)
            .post('/')
            .send({your_data: {lat: null, lng: null}})
            .end((err, res)=>{
                expect(err);
                done();
            });
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
});

});
