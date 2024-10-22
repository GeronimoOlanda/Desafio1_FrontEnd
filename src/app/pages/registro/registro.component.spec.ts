import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegistroComponent } from './registro.component';
import { AuthService } from '../../services/auth.service';

class MockAuthService {
  register(nome: string, email: string, password: string) {
    return of({}); // Simula um registro bem-sucedido
  }
}

class MockRouter {
  navigate(path: string[]) {
    // Mock da navegação
  }
}

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistroComponent], // Importa o componente como standalone
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('deve criar o componente RegistroComponent', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir erro se as senhas não coincidirem', () => {
    component.password = 'senha123';
    component.confirmPassword = 'senha456';
    component.register();

    expect(component.errorMessage).toBe('As senhas não coincidem!');
  });

  it('deve registrar o usuário e redirecionar para o login', () => {
    spyOn(router, 'navigate'); // Espiona o método navigate do router
    component.username = 'usuario@teste.com';
    component.password = 'senha123';
    component.confirmPassword = 'senha123';

    component.register();

    expect(component.errorMessage).toBe('');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('deve exibir erro ao tentar registrar com falha', () => {
    const errorResponse = { error: { message: 'Erro ao registrar' } };
    spyOn(authService, 'register').and.returnValue(throwError(errorResponse));
    component.username = 'usuario@teste.com';
    component.password = 'senha123';
    component.confirmPassword = 'senha123';

    component.register();

    expect(component.errorMessage).toBe('Erro ao registrar: Erro ao registrar');
  });
});
