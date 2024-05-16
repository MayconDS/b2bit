import axios from "./config";
import { UserLogin } from "./types";

class Api {
  async login(data: UserLogin) {
    const req = await axios.post("/login/", data);
    const res = await req.data;
    return res;
  }
  async profile() {
    const req = await axios.get("/profile/");
    const res = await req.data;
    return res;
  }
}

export default new Api();
