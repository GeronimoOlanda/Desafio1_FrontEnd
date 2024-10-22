import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private apiUrl = 'https://localhost:7112/api/tarefas'; // URL do backend

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); //  armazena o token no localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getTarefas(page: number, pageSize: number): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`, {
      headers: this.getAuthHeaders() // Adiciona o cabeçalho de autenticação
    });
  }

  addTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa, {
      headers: this.getAuthHeaders() // Adiciona o cabeçalho de autenticação
    });
  }

  updateTarefa(tarefa: Tarefa): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${tarefa.id}`, tarefa, {
      headers: this.getAuthHeaders() // Adiciona o cabeçalho de autenticação
    });
  }

  deleteTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders() // Adiciona o cabeçalho de autenticação
    });
  }
}
