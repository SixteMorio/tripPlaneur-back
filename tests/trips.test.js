import { it, describe, expect } from "vitest";
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
  it("responds with the correct JSON data", async () => {
    const response = await request(app).get("/v1/trip/eba8f005-a4e1-4723-ab07-9c62aa7e9c3e")
      .expect("Content-Type", "application/json; charset=utf-8")
    expect('id' in response.body, 'id is in the response').toEqual(true)
    expect('prompt' in response.body, 'prompt is in the response').toEqual(true)
    expect('resIa' in response.body, 'resIa is in tin the response').toEqual(true)
  })
})

describe("GET /v1/trip/12345", () => {
  it("returns a 404 if product does not exist", () => {
    return request(app)
      .get("/products/12345")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(404);
  });
});