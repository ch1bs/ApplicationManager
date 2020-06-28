import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      wayOfCommunication: ['', Validators.required],
      englishLevel: ['', Validators.required],
      availableToStart: ['', Validators.required],
      techSkills: ['', Validators.required],
      personalPresentation: ['', Validators.required],
      studyFromHome: ['', Validators.required]
    });
  }


  resetFields(): void {
    this.userForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      age: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      wayOfCommunication: new FormControl('', Validators.required),
      englishLevel: new FormControl('', Validators.required),
      availableToStart: new FormControl('', Validators.required),
      techSkills: new FormControl('', Validators.required),
      personalPresentation: new FormControl('', Validators.required),
      studyFromHome: new FormControl('', Validators.required),

    });
  }

  onSubmit(value: any): void {
    this.firebaseService.createUser(value)
      .then(() => {
          this.resetFields();
          this.router.navigate(['/home']);
        }
      )
  }

}
