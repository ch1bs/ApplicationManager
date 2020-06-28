import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  students: Array<any>;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.firebaseService.getUsers()
      .subscribe(result => {
        this.students = result;
      })
  }

  viewDetails(student): void {
    this.router.navigate([`/details/${student.payload.doc.id}`]);
  }

}
