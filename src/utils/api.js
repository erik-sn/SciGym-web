import axios from "axios";

class StadiumApiClient {
  constructor(base, version) {
    this.base = base;
    this.version = version;
    this.url = `${base}/${version}`;
  }

  config() {
    return axios.get(`${this.url}/app_config/`);
  }

  status() {
    return axios.get(`${this.base}/watchman/`);
  }

  repos() {
    return axios.get(`${this.url}/repos/`);
  }
}

export default new StadiumApiClient("http://localhost:8000/api", "v1");
