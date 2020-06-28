import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  item: any;

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm(): void {
    this.userForm = this.fb.group({
      firstName: [this.item.firstName, Validators.required],
      lastName: [this.item.lastName, Validators.required],
      email: [this.item.email, [Validators.required, Validators.email]],
      age: [this.item.age, Validators.required],
      phoneNumber: [this.item.phoneNumber, Validators.required],
      wayOfCommunication: [this.item.wayOfCommunication, Validators.required],
      englishLevel: [this.item.englishLevel, Validators.required],
      availableToStart: [this.item.availableToStart.toDate(), Validators.required],
      techSkills: [this.item.techSkills, Validators.required],
      personalPresentation: [this.item.personalPresentation, Validators.required],
      studyFromHome: [this.item.studyFromHome, Validators.required]
    });
  }

  onSubmit(value: any): void {
    value.age = Number(value.age);
    this.firebaseService.updateUser(this.item.id, value)
      .then(
        res => {
          this.router.navigate(['/home']);
        }
      )
  }

  delete(): void {
    this.firebaseService.deleteUser(this.item.id)
      .then(() => {
          this.router.navigate(['/home']);
        }
      );
  }

}
