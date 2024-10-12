import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../../services/tarefa.service'; // Importe o serviço de tarefas
import { Tarefa } from '../../models/tarefa'; // Importe o modelo de tarefa
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pagina-inicial',
  standalone: true, 
  imports: [FormsModule, CommonModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {
  tarefas: Tarefa[] = [];
  novaTarefa: Tarefa = { id: 0, titulo: '', descricao: '', concluida: false }; // Inicialize a nova tarefa
  paginaAtual: number = 1;
  tarefasPorPagina: number = 5; // Defina quantas tarefas você deseja por página

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.tarefaService.getTarefas(this.paginaAtual, this.tarefasPorPagina).subscribe(tarefas => {
      this.tarefas = tarefas;
    });
  }

  adicionarTarefa() {
    this.tarefaService.adicionarTarefa(this.novaTarefa).subscribe(() => {
      this.carregarTarefas();
      this.novaTarefa = { id: 0, titulo: '', descricao: '', concluida: false }; // Limpar o formulário
    });
  }

  marcarComoConcluida(tarefa: Tarefa) {
    tarefa.concluida = true;
    this.tarefaService.atualizarTarefa(tarefa).subscribe(() => {
      this.carregarTarefas();
    });
  }

  atualizarTarefa(tarefa: Tarefa) {
    this.tarefaService.atualizarTarefa(tarefa).subscribe(() => {
      this.carregarTarefas();
    });
  }

  removerTarefa(tarefa: Tarefa) {
    this.tarefaService.removerTarefa(tarefa.id).subscribe(() => {
      this.carregarTarefas();
    });
  }
}
