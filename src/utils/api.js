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

  login(code) {
    return axios.post(`${this.url}/users/${code}/github_oauth/`);
  }

  refreshToken(token) {
    return axios.post(`${this.url}/users/${token}/refresh_token/`);
  }

  me() {
    return axios.get(`${this.url}/users/me/`);
  }

  status() {
    return axios.get(`${this.base}/watchman/`);
  }

  environments(params) {
    return axios.get(`${this.url}/environments/`);
  }

  createEnvironment(name, repositoryId, isPublic, pypiUrl) {
    return axios.post(`${this.url}/environments/`, {
      name,
      public: isPublic,
      pypi_url: pypiUrl,
      repository: repositoryId
    });
  }

  repositories() {
    return axios.get(`${this.url}/repositories/`);
  }

  myRepositories() {
    return axios.get(`${this.url}/repositories/mine/`);
  }

  findGymRepos() {
    return axios.post(`${this.url}/repositories/find_gym_repos/`);
  }
}

export default new StadiumApiClient("http://localhost:8000/api", "v1");
