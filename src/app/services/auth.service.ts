import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  async loginWithGoogle(): Promise<UserCredential> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      await this.addUserToFirestore(userCredential.user.uid, userCredential.user.email);
      return userCredential;
    } catch (error) {
      console.error("Erreur d'authentification avec Google :", error);
      throw error;
    }
  }
  constructor(private auth: Auth, private firestore: Firestore) {}

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    }
  }

  async register(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.addUserToFirestore(userCredential.user.uid, userCredential.user.email);
      return userCredential;
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      throw error;
    }
  }
  private async addUserToFirestore(uid: string, email: string | null): Promise<void> {
    if (!email) return;

    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: uid,
        email: email,
        firstName: "",
        lastName: "",
        gender: "",
        createdAt: new Date()
      });
      console.log("Utilisateur ajouté à Firestore !");
    } else {
      console.log("L'utilisateur existe déjà dans Firestore.");
    }
  }


  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
      throw error;
    }
  }
}
