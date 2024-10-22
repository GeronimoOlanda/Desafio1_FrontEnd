import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true, 
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  username: string = '';
  nome: string = 'Teste'
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem!';
      return;
    }

    this.authService.register(this.nome, this.username, this.password).subscribe({
      next: (res) => {
        alert('Registrado com sucesso!');
        this.router.navigate(['/login']); // Redireciona para o login após o registro
      },
      error: (err) => {
        this.errorMessage = 'Erro ao registrar: ' + err.error.message;
      }
    });
  }
}
