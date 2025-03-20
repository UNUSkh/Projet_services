import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) { }

  // Récupérer les informations du profil utilisateur depuis Firestore
  async getUserProfile(uid: string) {
    const userRef = doc(this.firestore, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('Utilisateur non trouvé');
    }
  }

  // Mettre à jour les informations du profil utilisateur dans Firestore
  async updateUserProfile(uid: string, updatedData: any) {
    const userRef = doc(this.firestore, 'users', uid);
    await updateDoc(userRef, updatedData);
  }
}
