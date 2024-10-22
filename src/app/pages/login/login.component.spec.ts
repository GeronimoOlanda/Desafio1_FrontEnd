import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

// Mocking AuthService
class MockAuthService {
  login(username: string, password: string) {
    if (username === 'teste' && password === 'senha') {
      return of({ token: 'fake-token' });
    }
    return throwError({ error: { message: 'Credenciais Inválidas"' } });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
}

// Mocking Router
class MockRouter {
  navigate(url: string[]) {
    return url; // Simula o redirecionamento
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, LoginComponent], // Importando o LoginComponent
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve fazer login com sucesso e redirecionar para /tarefas', () => {
    spyOn(authService, 'setToken').and.callThrough();
    spyOn(router, 'navigate'); // Espionando o método navigate do Router

    component.username = 'teste';
    component.password = 'senha';
    component.login();

    expect(authService.setToken).toHaveBeenCalledWith('fake-token');
    expect(router.navigate).toHaveBeenCalledWith(['/tarefas']); // Verifica se o router.navigate foi chamado corretamente
  });

  it('deve mostrar mensagem de erro ao falhar no login', () => {
    component.username = 'usuarioerrado';
    component.password = 'senhaErrada';
    component.login();

    expect(component.errorMessage).toBe('Credenciais Inválidas"');
  });
});
