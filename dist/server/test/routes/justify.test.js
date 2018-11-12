"use strict";

var _supertestAsPromised = require("supertest-as-promised");

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _httpStatus = require("http-status");

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _chai = require("chai");

var _index = require("../../../index");

var _index2 = _interopRequireDefault(_index);

var _token = require("../../models/token");

var _token2 = _interopRequireDefault(_token);

var _user = require("../../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("sinon-mongoose");
require("sinon-as-promised");

/** Launch our tests */

describe("## Justify API Tests", function () {
  var token = void 0,
      user = void 0;

  /** Generate a token before the tests of api/justify to use in the route tests */

  /*before(done => {
    User.create({
      email: "test@user.com",
      password: "testuser"
    }).then(u => {
      console.log(u);
      user = u;
      done();
    });
  });*/

  before(function (done) {
    (0, _supertestAsPromised2.default)(_index2.default).post("/api/token").send({ email: "test@user.com", password: "testuser" }).then(function (res) {
      token = res.body.jwt;
      done();
    });
  });

  /** Generate token with a post to api/token test */

  describe("### POST api/token", function () {
    it("should return the token generated successfully", function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post("/api/token").send({ email: "test@user.com", password: "testuser" }).expect(_httpStatus2.default.OK).then(function (res) {
        console.log(res.body.jwt);
        (0, _chai.expect)(res.body.jwt).to.exist;
        done();
      });
    });
  });

  /** Test api/justify */

  describe("### POST api/justify", function () {
    /** First test: RETURN the FORMATTED text successfully */
    it("should return the justified text successfully", function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post("/api/justify").send({
        text: "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint."
      }).set("Authorization", "Bearer " + token).expect(_httpStatus2.default.OK).then(function (res) {
        console.log(res.text);
        (0, _chai.expect)(res.text).to.exist;
        done();
      });
    });

    /** Second test: Set WORDS to 81000 and test that user can't FORMAT text anymore and return ERROR 402 PAYMENT REQUIRED */

    it("should return Payment Required", function (done) {
      _token2.default.findOne({ token: token }, { words: true }, function (err, result) {
        if (err) {
          console.log("WRONG");
        } else {}
      });
      var query = { token: token };
      _token2.default.findOneAndUpdate(query, { $set: { words: 81000 } }, {
        new: true
      }, function (err, doc) {
        if (err) {
          console.log("Something wrong when updating data!");
        }
      });
      (0, _supertestAsPromised2.default)(_index2.default).post("/api/justify").send({
        text: "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint."
      }).set("Authorization", "Bearer " + token).expect(_httpStatus2.default["402"]).then(function (res) {
        console.log(res.text);
        (0, _chai.expect)(res.text).to.exist;
        done();
      });
    });
  });
});