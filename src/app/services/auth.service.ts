import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7112/api/Auth';  // Ajuste a URL do back-end

  constructor(private http: HttpClient, private router: Router) { }

  // Registro de usuário
  register(nome: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { email, senha: password, nome }).pipe(
      catchError(this.handleError)
    );
  }

  // Login de usuário
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, senha }).pipe(
      catchError(this.handleError)
    );
  }

  // Armazena o token JWT localmente
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Retorna o token JWT armazenado
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.parseJwt(token);
    const now = Date.now() / 1000; // Tempo atual em segundos

    return payload.exp > now; // Retorna true se o token não expirou
  }

  // Realiza logout
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);  // Redireciona para a página de login
  }

  // Tratamento de erros
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código de erro: ${error.status}\nMensagem: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64)); // Decodifica o token JWT
  }
}
