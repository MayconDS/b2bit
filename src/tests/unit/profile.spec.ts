import { describe, it, expect, beforeEach, vi } from "vitest";
import Api from "../../services/api";

const FakeHttpResponse = {
  id: 4,
  name: "Cliente",
  email: "cliente@youdrive.com",
  is_active: true,
  avatar: null,
  type: "StoreUser",
  created: "2023-09-20T11:42:54.515946-03:00",
  modified: "2024-05-15T19:02:03.518611-03:00",
  role: "OWNER",
};

const FakeHttpResponseError = {
  detail: "O token informado não é válido para qualquer tipo de token",
  code: "token_not_valid",
  messages: [
    {
      token_class: "AccessToken",
      token_type: "access",
      message: "O token é inválido ou expirado",
    },
  ],
};

describe("Profile Request API", () => {
  let apiPostMock: any;

  beforeEach(() => {
    vi.clearAllMocks();

    apiPostMock = vi
      .spyOn(Api, "profile")
      .mockResolvedValueOnce(FakeHttpResponse);
  });

  it("should call the API method profile", async () => {
    await Api.profile();
    expect(apiPostMock).toHaveBeenCalledTimes(1);
  });

  it("should return data user on success", async () => {
    const data = await Api.profile();
    expect(data).toEqual(FakeHttpResponse);
  });

  it("should return 401 if invalid credentials are provided", async () => {
    vi.spyOn(Api, "profile").mockResolvedValueOnce(FakeHttpResponseError);

    const response = await Api.profile();
    await expect(response).toEqual(FakeHttpResponseError);
  });
});
