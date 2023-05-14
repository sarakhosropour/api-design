import { comparePasswords, createJWT, hashPassword } from "../../modules/auth";
import * as user from "../user";
import httpMocks from "node-mocks-http";

describe("user handler", () => {
  it("should create a new user", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/api/user",
    });
    request.body = {
      username: "jestTestUser",
      password: "admin",
    };

    const response = httpMocks.createResponse();

    await user.createNewUser(request, response, () => {});
    const { newUser } = JSON.parse(response._getData());

    expect(newUser.username).toBe("jestTestUser");
  });
});
