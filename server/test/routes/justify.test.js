import request from "supertest-as-promised";
import httpStatus from "http-status";
import { expect } from "chai";
import app from "../../../index";
import Token from "../../models/token";

require("sinon-mongoose");
require("sinon-as-promised");

/** Launch our tests */

describe("## Justify API Tests", () => {
  let token;

/** Generate a token before the tests of api/justify to use in the route tests */

  before(done => {
    request(app)
      .post("/api/token")
      .send()
      .then(res => {
        token = res.body.jwt;
        done();
      });
  });

/** Generate token with a post to api/token test */

  describe("### POST api/token", () => {
    it("should return the token generated successfully", done => {
      request(app)
        .post("/api/token")
        .send()
        .expect(httpStatus.OK)
        .then(res => {
          console.log(res.body.jwt);
          expect(res.body.jwt).to.exist;
          done();
        });
    });
  });

/** Test api/justify */

  describe("### POST api/justify", () => {
    /** First test: RETURN the FORMATTED text successfully */
    it("should return the justified text successfully", done => {
      request(app)
        .post("/api/justify")
        .send({
          text:
            "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint."
        })
        .set("Authorization", `Bearer ${token}`)
        .expect(httpStatus.OK)
        .then(res => {
          console.log(res.text);
          expect(res.text).to.exist;
          done();
        });
    });

    /** Second test: Set WORDS to 81000 and test that user can't FORMAT text anymore and return ERROR 402 PAYMENT REQUIRED */

    it("should return Payment Required", done => {
      Token.findOne({ token: token }, { words: true }, (err, result) => {
        if (err) {
          console.log("WRONG");
        } else {
        }
      });
      var query = { token: token };
      Token.findOneAndUpdate(
        query,
        { $set: { words: 81000 } },
        {
          new: true
        },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
        }
      );
      request(app)
        .post("/api/justify")
        .send({
          text:
            "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint."
        })
        .set("Authorization", `Bearer ${token}`)
        .expect(httpStatus["402"])
        .then(res => {
          console.log(res.text);
          expect(res.text).to.exist;
          done();
        });
    });
  });
});
