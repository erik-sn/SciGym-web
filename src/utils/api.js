import axios from "axios";

class StadiumApiClient {
  constructor(base, version) {
    this.base = base;
    this.version = version;
    this.url = `${base}/${version}`;
  }

  login(code) {
    return axios.post(`${this.url}/users/${code}/github_oauth/`);
  }

  config() {
    return axios.get(`${this.url}/app_config/`);
  }

  status() {
    return axios.get(`${this.base}/watchman/`);
  }

  environments(params) {
    return axios.get(`${this.url}/environments/`);
  }

  repositories() {
    return axios.get(`${this.url}/repositories/`);
  }

  findGymRepos() {
    return axios.get(`${this.url}/repositories/find_gym_repos/`);
  }
}

export default new StadiumApiClient("http://localhost:8000/api", "v1");
