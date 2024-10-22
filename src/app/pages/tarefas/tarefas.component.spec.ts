import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarefasComponent } from './tarefas.component';
import { TarefasService } from '../../services/tarefa.service';
import { of } from 'rxjs';
import { Tarefa } from '../../models/tarefa';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

describe('TarefasComponent', () => {
  let component: TarefasComponent;
  let fixture: ComponentFixture<TarefasComponent>;
  let tarefasServiceMock: jasmine.SpyObj<TarefasService>;

  beforeEach(async () => {
    tarefasServiceMock = jasmine.createSpyObj('TarefasService', ['getTarefas', 'addTarefa', 'updateTarefa', 'deleteTarefa']);
    
    // Configuração do TestBed
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [], // Mantenha vazio para componentes standalone
      providers: [
        { provide: TarefasService, useValue: tarefasServiceMock }
      ]
    }).compileComponents();

    // Importa o componente standalone
    fixture = TestBed.createComponent(TarefasComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    tarefasServiceMock.getTarefas.and.returnValue(of([])); 
    fixture.detectChanges(); // Detecta mudanças no componente
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy(); // Verifica se o componente foi criado com sucesso
  });

  it('deve carregar tarefas no ngOnInit', () => {
    const tarefasMock: Tarefa[] = [
      { id: 1, titulo: 'Tarefa 1', descricao: 'Descrição 1', concluida: false, usuarioId: 1 },
      { id: 2, titulo: 'Tarefa 2', descricao: 'Descrição 2', concluida: true, usuarioId: 1 }
    ];

    tarefasServiceMock.getTarefas.and.returnValue(of(tarefasMock)); // Mock do retorno do método getTarefas
    component.ngOnInit(); 
    
    expect(component.tarefas.length).toBe(2); 
    expect(component.tarefas).toEqual(tarefasMock); 
  });

  it('deve adicionar uma nova tarefa', () => {
    const novaTarefa: Tarefa = { id: 0, titulo: 'Nova Tarefa', descricao: 'Nova Descrição', concluida: false, usuarioId: 1 };
    const tarefaRetornada: Tarefa = { id: 3, titulo: 'Nova Tarefa', descricao: 'Nova Descrição', concluida: false, usuarioId: 1 };

    tarefasServiceMock.addTarefa.and.returnValue(of(tarefaRetornada)); 
    
    component.newTarefa = novaTarefa; 
    component.addTarefa(); 

    expect(tarefasServiceMock.addTarefa).toHaveBeenCalledWith(novaTarefa); 
    expect(component.newTarefa).toEqual({ id: 0, titulo: '', descricao: '', concluida: false, usuarioId: 0 }); 
  });

  it('deve alternar o estado de conclusão de uma tarefa', () => {
    const tarefaMock: Tarefa = { id: 1, titulo: 'Tarefa 1', descricao: 'Descrição 1', concluida: false, usuarioId: 1 };
    
    tarefasServiceMock.updateTarefa.and.returnValue(of(undefined)); 

    component.toggleConcluida(tarefaMock); 

    expect(tarefaMock.concluida).toBeTrue(); 
    expect(tarefasServiceMock.updateTarefa).toHaveBeenCalledWith(tarefaMock); 
  });

  it('deve deletar uma tarefa', () => {
    const idTarefa = 1;
    tarefasServiceMock.deleteTarefa.and.returnValue(of(undefined)); 

    component.deleteTarefa(idTarefa);

    expect(tarefasServiceMock.deleteTarefa).toHaveBeenCalledWith(idTarefa); 
  });

  it('deve ir para a página anterior', () => {
    component.page = 2; 
    component.previousPage(); 
    expect(component.page).toBe(1); 
  });

  it('deve ir para a próxima página', () => {
    component.page = 1; 
    component.nextPage(); 
    expect(component.page).toBe(2); 
  });
});
