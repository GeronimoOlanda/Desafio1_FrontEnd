import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Importe o AuthService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated = false; 
  userName = ''; 

  constructor(private authService: AuthService, private router: Router) {
    this.checkAuthentication();
  }


  login() {
    this.router.navigate(['/login']);
  }

  
  logout() {
    this.authService.logout();  
    this.router.navigate(['/login']);
  }


  checkAuthentication() {
    this.isAuthenticated = this.authService.isAuthenticated();  
    if (this.isAuthenticated) {
      const token = this.authService.getToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userName = payload.nome; 
      }
    }
  }

  ngOnInit() {
    this.checkAuthentication();
  }
}
