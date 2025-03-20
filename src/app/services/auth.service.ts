import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, sendEmailVerification } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    provider.addScope('https://www.googleapis.com/auth/user.gender.read');

    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      if (!result) {
        throw new Error('Google sign-in failed');
      }

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=genders', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await response.json();

      const gender = data.genders?.[0]?.value || 'not specified';

      const displayName = user.displayName || '';
      const email = user.email || '';
      const names = displayName.split(' ');
      const firstName = names[0] || '';
      const lastName = names.slice(1).join(' ') || '';
      const verified = true;

      const userRef = doc(this.firestore, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {

        await setDoc(userRef, {
          firstName,
          lastName,
          gender,
          email,
          createdAt: new Date(),
          verified,
          uid:user.uid
        });

      } else {
        console.log('Utilisateur déjà existant.');
      }

      return { firstName, lastName, gender, email };
    } catch (error) {

      throw error;
    }
  }


  async login(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);

      if (!userCredential.user.emailVerified) {
        throw new Error("Veuillez vérifier votre email avant de vous connecter.");
      }

      return userCredential;
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    }
  }

  async register(email: string, password: string,firstName: string, lastName: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.sendemailVerification(userCredential.user);

      await this.addUserToFirestore(userCredential.user.uid, userCredential.user.email, firstName, lastName);
      return userCredential;
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      throw error;
    }
  }
  private async addUserToFirestore(uid: string, email: string | null,firstName: string, lastName: string): Promise<void> {
    if (!email) return;

    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        gender: "",
        verified: false,
        createdAt: new Date()
      });
      console.log("Utilisateur ajouté à Firestore !");
    } else {
      console.log("L'utilisateur existe déjà dans Firestore.");
    }
  }
  async getUserProfile(uid: string) {
    const userRef = doc(this.firestore, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('Utilisateur non trouvé');
    }
  }

  async updateUserProfile(uid: string, updatedData: any) {
    const userRef = doc(this.firestore, 'users', uid);
    try {
      await updateDoc(userRef, updatedData);
      console.log("Profil mis à jour avec succès");
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw new Error("Erreur lors de la mise à jour du profil");
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

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Email de réinitialisation envoyé');
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      throw error;
    }
  }

  async sendemailVerification(user: any): Promise<void> {
    try {
      await sendEmailVerification(user);
      console.log("Email de vérification envoyé !");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email de vérification :", error);
    }
  }
}
