import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private db: AngularFirestore
  ) {
  }

  getUser(userKey: string): Observable<Action<DocumentSnapshot<unknown>>> {
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateUser(userKey: string, value: any): Promise<void> {
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey: string): Promise<void> {
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers(): Observable<DocumentChangeAction<unknown>[]> {
    return this.db.collection('users').snapshotChanges();
  }

  createUser(value: any): Promise<DocumentReference> {
    return this.db.collection('users').add({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      age: parseInt(value.age),
      phoneNumber: value.phoneNumber,
      wayOfCommunication: value.wayOfCommunication,
      englishLevel: value.englishLevel,
      availableToStart: value.availableToStart,
      techSkills: value.techSkills,
      personalPresentation: value.personalPresentation,
      studyFromHome: value.studyFromHome
    });
  }
}
