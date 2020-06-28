import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IApplication } from '../shared/interfaces';
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  studentApplication: IApplication;

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.studentApplication = data.payload.data();
        this.studentApplication.id = data.payload.id;
        this.createForm();
      }
    })
  }

  createForm(): void {
    this.userForm = this.fb.group({
      firstName: [this.studentApplication.firstName, Validators.required],
      lastName: [this.studentApplication.lastName, Validators.required],
      email: [this.studentApplication.email, [Validators.required, Validators.email]],
      age: [this.studentApplication.age, Validators.required],
      phoneNumber: [this.studentApplication.phoneNumber, Validators.required],
      wayOfCommunication: [this.studentApplication.wayOfCommunication, Validators.required],
      englishLevel: [this.studentApplication.englishLevel, Validators.required],
      availableToStart: [this.studentApplication.availableToStart.toDate(), Validators.required],
      techSkills: [this.studentApplication.techSkills],
      personalPresentation: [this.studentApplication.personalPresentation],
      studyFromHome: [this.studentApplication.studyFromHome]
    });
  }

  onSubmit(value: IApplication): void {
    this.firebaseService.updateUser(this.studentApplication.id, value)
      .then(() => {
          this.router.navigate(['/home']);
          this.toastr.success('User updated successfully!')
        }
      )
  }

  delete(): void {
    Swal.fire({
      title: 'Are you sure you want to delete student?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Student has been deleted.',
          'success'
        )

        this.firebaseService.deleteUser(this.studentApplication.id)
          .then(() => {
              this.router.navigate(['/home']);
            }
          );
      }
    })

  }

}
