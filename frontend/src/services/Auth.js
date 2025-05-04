import app from "../config/firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
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

  async googleLogin() {
    try {
      let provider = new GoogleAuthProvider();
      let result = await signInWithPopup(this.auth, provider);

      return result.user;
    } catch (error) {
      throw error;
    }
  }

  getLoggedinUser() {
    try {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(this.auth, function (currentUser) {
          if (currentUser) {
            let newUser = {};
            newUser.name = currentUser.displayName;
            newUser.email = currentUser.email;
            resolve(newUser);
          } else {
            reject(new Error("No Logged in User"));
          }
        });
      });
    } catch (error) {
      throw error;
    }
  }
}

let authService = new AuthService();

export default authService;
