import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from '../../components/users/user-list/user-list.component';
import { UserDetailComponent } from '../../components/users/user-detail/user-detail.component';

/**
 * Módulo de Usuários
 * 
 * Este módulo demonstra:
 * - Lazy loading de funcionalidades
 * - Feature modules organizados por domínio
 * - Rutas filhas específicas do módulo
 * - Componentes relacionados a usuários
 * 
 * Carregado sob demanda quando o usuário navega para /users
 */
@NgModule({
  declarations: [
    // Componentes pertencentes ao módulo
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    // Módulos necessários para as funcionalidades
    CommonModule,      // Diretivas básicas (*ngFor, *ngIf, etc.)
    RouterModule.forChild([
      {
        path: '',
        component: UserListComponent
      },
      {
        path: ':id',
        component: UserDetailComponent
      }
    ]),
    FormsModule        // Para two-way data binding
  ],
  exports: [
    // Em módulos lazy, normalmente não exportamos componentes
    // pois são usados apenas dentro do próprio módulo
  ]
})
export class UserModule {
  constructor() {
    console.log('UserModule carregado (Lazy Loading)');
  }
}