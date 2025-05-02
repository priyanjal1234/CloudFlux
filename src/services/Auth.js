import app from "../config/firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
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

  async loginAccount(loginData) {
    let { email, password } = loginData;
    try {
      let userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      let user = userCredential.user;

      return user;
    } catch (error) {
      throw error;
    }
  }
}

let authService = new AuthService();

export default authService;
