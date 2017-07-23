import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { UserService } from '../user.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  username = '';
  password = '';
  validationMessage = '';

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.username = localStorage.getItem('icc_campapp_username');
    this.password = localStorage.getItem('icc_campapp_password');
  }

  saveCredentials(): void {
    this.userService.login(this.username, this.password)
      .subscribe((success) => {
        if (success) {
          this.router.navigate(['/']);
        } else {
          this.validationMessage = 'The combination of your username and password are not correct. Please try again.';
        }
      }, (error) => {
        this.validationMessage = 'The combination of your username and password are not correct. Please try again.';
      });
  }
}
