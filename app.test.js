const request = require("supertest");
const app = require("./index"); // Update with the correct path to your Express app
const data = require("./data");  // Assuming this is the data array used in your Express routes

describe("API Endpoints", () => {
  
  // Test GET /plan
  it("should return 200 and list of plans", async () => {
    const response = await request(app).get("/service/plan");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array)); // Ensure it's returning an array
    // Additional checks can be added here to verify the content of the array
  });

  // Test POST /plan
  it("should return 200 and add a new plan", async () => {
    const newPlan = { plan_name: "Premium", description: "High-end plan" };
    const response = await request(app)
      .post("/service/plan")
      .send(newPlan)
      .set("Content-Type", "application/json");
    
    expect(response.status).toBe(200);
    expect(response.text).toBe("plan added successfully");

    // Check if the new plan was actually added
    const getResponse = await request(app).get("/service/plan");
    expect(getResponse.body).toContainEqual(newPlan);
  });

  // Test PUT /plan
  it("should return 200 and update an existing plan", async () => {
    const updatedPlan = { plan_name: "Premium", description: "Updated description" };
    const response = await request(app)
      .put("/service/plan")
      .send(updatedPlan)
      .set("Content-Type", "application/json");
    
    expect(response.status).toBe(200);
    expect(response.text).toBe("data updated");

    // Verify that the plan was updated
    const getResponse = await request(app).get("/service/plan");
    expect(getResponse.body).toContainEqual(updatedPlan);
  });

  // Test DELETE /plan
  it("should return 200 and delete a plan", async () => {
    const planToDelete = { plan_name: "Premium" };
    const response = await request(app)
      .delete("/service/plan")
      .send(planToDelete)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.text).toBe("data updated");

    // Verify that the plan was deleted
    const getResponse = await request(app).get("/service/plan");
    expect(getResponse.body).not.toContainEqual(expect.objectContaining(planToDelete));
  });

  // Test middleware function execution (already provided)
  it("should call the middleware function", async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    middleware(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
