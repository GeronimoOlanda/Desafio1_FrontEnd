import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { TarefasComponent } from './pages/tarefas/tarefas.component';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'pagina-inicial', component: PaginaInicialComponent , canActivate: [AuthGuard] },
  { path: 'tarefas', component: TarefasComponent, canActivate: [AuthGuard] }, // Rota da página de tarefas
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' } 
];
