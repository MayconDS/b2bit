import { describe, it, expect, beforeEach, vi } from "vitest";
import Api from "../../services/api";

const FakeHttpRequest = {
  email: "any_mail@mail.com",
  password: "any_password",
};

const FakeHttpResponse = {
  user: {
    id: 1,
    name: "any_client",
    email: "any_email@mail.com",
    is_active: true,
    avatar: null,
    type: "any_type",
    created: "any_date",
    modified: "any_date",
    role: "any_role",
  },
  tokens: {
    refresh: "any_token",
    access: "any_token",
  },
};

const FakeHttpResponseError = {
  detail: "Usuário e/ou senha incorreto(s)",
};

describe("Login Request API", () => {
  let apiPostMock: any;

  beforeEach(() => {
    // Limpa todas as simulações antes de cada teste
    vi.clearAllMocks();

    // Simula axios.post
    apiPostMock = vi
      .spyOn(Api, "login")
      .mockResolvedValueOnce(FakeHttpResponse);
  });

  it("should call the API method login with mocked values", async () => {
    await Api.login({
      email: FakeHttpRequest.email,
      password: FakeHttpRequest.password,
    });

    expect(apiPostMock).toHaveBeenCalledTimes(1);
    expect(apiPostMock).toHaveBeenCalledWith(FakeHttpRequest);
  });

  it("should return user and tokens on success", async () => {
    const data = await Api.login({
      email: FakeHttpRequest.email,
      password: FakeHttpRequest.password,
    });

    expect(data).toEqual(FakeHttpResponse);
  });

  it("should return 401 if invalid credentials are provided", async () => {
    vi.spyOn(Api, "login").mockResolvedValueOnce(FakeHttpResponseError);

    const response = await Api.login(FakeHttpRequest);
    await expect(response).toEqual(FakeHttpResponseError);
  });
});
