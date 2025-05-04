import api from "./api";

class CloudService {
  constructor() {
    this.api = api;
    this.baseUrl = "http://localhost:3000/api";
  }

  async connectAWS(credData) {
    try {
      return await this.api.post(`${this.baseUrl}/aws/connect`, credData, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async checkConnection(data) {
    try {
      return await this.api.post(
        `${this.baseUrl}/connection/check-connection`,
        data,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

let cloudService = new CloudService();

export default cloudService;
