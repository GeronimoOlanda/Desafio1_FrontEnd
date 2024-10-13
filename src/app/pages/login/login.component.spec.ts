import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa o módulo de teste HTTP
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';  // Supondo que haja um AuthService
import { LoginComponent } from './login.component';

