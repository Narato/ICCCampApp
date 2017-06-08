import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('icc_campapp_username');
    this.password = localStorage.getItem('icc_campapp_password');
  }

  saveCredentials(): void {
    localStorage.setItem('icc_campapp_username', this.username);
    localStorage.setItem('icc_campapp_password', this.password);
    this.router.navigate(['/']);  }
}
