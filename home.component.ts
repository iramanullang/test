import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, ) {}

  ngOnInit() {
    // if (!this.authService.isAuthenticated()){
    //   this.router.navigate(['/login']);
    // }
  }


}
