import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private baseUrl = 'https://seu-endpoint-api.com/tarefas'; // Altere para o seu endpoint

  constructor(private http: HttpClient) {}

  getTarefas(pagina: number, tarefasPorPagina: number): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.baseUrl}?pagina=${pagina}&itensPorPagina=${tarefasPorPagina}`);
  }

  adicionarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.baseUrl, tarefa);
  }

  atualizarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.baseUrl}/${tarefa.id}`, tarefa);
  }

  removerTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
