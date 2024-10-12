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
  isAuthenticated = false; // Controle de autenticação
  userName = '';  // Nome do usuário

  constructor(private authService: AuthService, private router: Router) {
    this.checkAuthentication();
  }

  // Redireciona para a página de login
  login() {
    this.router.navigate(['/login']);
  }

  // Realiza logout, limpa o token e redireciona
  logout() {
    this.authService.logout();  // Chama o logout do AuthService
    this.router.navigate(['/login']);
  }

  // Verifica se o usuário está autenticado pelo token
  checkAuthentication() {
    this.isAuthenticated = this.authService.isAuthenticated();  // Usa o método do AuthService
    if (this.isAuthenticated) {
      const token = this.authService.getToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userName = payload.nome; // Extrai o nome do payload
      }
    }
  }

  // Executa ao inicializar o componente
  ngOnInit() {
    this.checkAuthentication();
  }
}
