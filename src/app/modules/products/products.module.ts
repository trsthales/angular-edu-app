import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';
import { ProductDetailComponent } from '../../components/products/product-detail/product-detail.component';

/**
 * Módulo de Produtos
 * 
 * Este módulo demonstra:
 * - Lazy loading (carregamento sob demanda)
 * - Feature modules (módulos de funcionalidade)
 * - Organizações de componentes relacionados
 * - Rutas filhas (child routes)
 * 
 * O @NgModule define:
 * - declarations: componentes pertencentes ao módulo
 * - imports: outros módulos necessários
 * - exports: componentes que podem ser usados externamente
 */
@NgModule({
  declarations: [
    // Componentes do módulo de produtos
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    // CommonModule: funcionalidades básicas do Angular
    CommonModule,
    
    // RouterModule: para configuração de rotas
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent
      }
    ]),
    
    // FormsModule: para two-way data binding
    FormsModule
  ],
  exports: [
    // Componentes exportados para uso em outros módulos
    // (Em módulos lazy, normalmente não exportamos nada)
  ]
})
export class ProductsModule { 
  // O construtor está vazio propositalmente
  // O Angular injeta dependências automaticamente
  
  constructor() {
    console.log('ProductsModule carregado (Lazy Loading)');
  }
}