import app from "../config/firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

class AuthService {
  constructor() {
    this.app = app;
    this.auth = getAuth(this.app);
  }

  async createAccount(registerData) {
    let { name, email, password } = registerData;
    try {
      let userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      let user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

let authService = new AuthService();

export default authService;
