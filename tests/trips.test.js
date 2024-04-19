import { it, describe } from "vitest";
import request from "supertest";
import { app } from "../app";

/*describe("GET /trip", () => {
  it("return a array empty if the trip is empty", async () => {
    const response = await request(app).get("/trip");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("return data's trip if there is a trip", async () => {
    const response = await request(app).get("/trip");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      const trip = response.body[0];
      expect(trip).toHaveProperty("id");
      expect(trip).toHaveProperty("prompt");
    }
  });
});*/

describe("GET /v1/trip/eba8f005-a4e1-4723-ab07-9c62aa7e9c3e", () => {
  it("responds with the correct JSON data", () => {
    return request(app).get("/v1/trip/eba8f005-a4e1-4723-ab07-9c62aa7e9c3e")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200, {
        id: "eba8f005-a4e1-4723-ab07-9c62aa7e9c3e",
        content: "7 jours en batmobile sur la côte Atlantique",
        createdAt: "2024-04-17 11:37:24.005",
        resIa: `"resIa": Array [
     Object {
       "desc": "Ville dynamique et cosmopolite de Floride, connue pour ses plages, sa vie nocturne et son architecture Art Déco.",
       "km": 0,
       "latlng": Array [
        25.774252,
         -80.193661,
       ],
       "name": "Miami",
       "num": 1,
     },
     Object {
       "desc": "Plus grande des îles des Keys de Floride, réputée pour la plongée sous-marine et la pêche.",       
       "km": 107,
       "latlng": Array [
         25.061389,
         -80.407222,
       ],
       "name": "Key Largo",
       "num": 2,
     },
     Object {
       "desc": "Ile tropicale pittoresque, connue pour son ambiance décontractée, son architecture victorienne et le coucher du soleil à Mallory Square.",
       "km": 158,
       "latlng": Array [
         24.555797,
         -81.785764,
       ],
       "name": "Key West",
       "num": 3,
     },
     Object {
       "desc": "Parc national américain abritant des milliers d'espèces animales et végétales, dont des crocodiles et des panthères de Floride.",
       "km": 225,
       "latlng": Array [
         25.360509,
         -80.953125,
       ],
       "name": "Everglades National Park",
       "num": 4,
     },
     Object {
       "desc": "Ville élégante de Floride, célèbre pour ses plages de sable blanc, ses boutiques et ses galeries d'art.",
       "km": 100,
       "latlng": Array [
         26.150399,
         -81.787728,
       ],
       "name": "Naples",
       "num": 5,
     },
     Object {
       "desc": "Ville côtière de Floride, offrant des plages de sable fin, de nombreux musées et le célèbre Dali Museum.",
       "km": 275,
       "latlng": Array [
         27.776447,
         -82.633209,
       ],
       "name": "St. Petersburg",
       "num": 6,
     },
     Object {
       "desc": "Ville connue pour ses parcs d'attractions, notamment Walt Disney World, Universal Orlando et SeaWorld.",
       "km": 106,
       "latlng": Array [
         28.538336,
         -81.379234,
       ],
       "name": "Orlando",
       "num": 7,
     },
   ],`,
        updatedAt: "2024-04-17 11:37:24.007"
      });
  });
})

describe("GET /v1/trip/12345", () => {
  it("returns a 404 if product does not exist", () => {
    return request(app)
      .get("/products/12345")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(404);
  });
});