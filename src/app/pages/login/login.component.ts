import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token);
        
        this.router.navigate(['/tarefas']);  // Redireciona para a página inicial após o login
       location.href= '/tarefas'
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao fazer login. Tente novamente.';
      }
      
    });
   
  }
}
