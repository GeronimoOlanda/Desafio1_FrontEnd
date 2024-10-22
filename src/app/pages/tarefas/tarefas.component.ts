import { Component, OnInit } from '@angular/core';
import { TarefasService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/tarefa';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  page = 1;
  pageSize = 5;
  newTarefa: Tarefa = { id: 0, titulo: '', descricao: '', concluida: false, usuarioId: 0 };

  constructor(private tarefasService: TarefasService) { }

  ngOnInit(): void {
    this.loadTarefas();
  }

  loadTarefas(): void {
    this.tarefasService.getTarefas(this.page, this.pageSize).subscribe(tarefas => {
      this.tarefas = tarefas;
    });
  }

  addTarefa(): void {
    this.newTarefa.usuarioId = 1; //
    this.tarefasService.addTarefa(this.newTarefa).subscribe(() => {
      this.loadTarefas();
      this.newTarefa = { id: 0, titulo: '', descricao: '', concluida: false, usuarioId: 0 }; // Reseta os campos
    });
  }

  toggleConcluida(tarefa: Tarefa): void {
    tarefa.concluida = !tarefa.concluida;
    this.tarefasService.updateTarefa(tarefa).subscribe(() => {
      this.loadTarefas();
    });
  }

  deleteTarefa(id: number): void {
    this.tarefasService.deleteTarefa(id).subscribe(() => {
      this.loadTarefas();
    });
  }

  // Função para ir para a página anterior
  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadTarefas();
    }
  }

  // Função para ir para a próxima página
  nextPage(): void {
    this.page++;
    this.loadTarefas();
  }
}
