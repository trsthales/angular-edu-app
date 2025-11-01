import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../models/interfaces';

/**
 * Serviço de Produtos
 * 
 * Este serviço é responsável por:
 * - Gerenciar dados de produtos
 * - Simular operações de API (CRUD)
 * - Demonstrar injeção de dependência
 * - Mostrar uso de Observables (RxJS)
 * 
 * O @Injectable() permite que o Angular injete este serviço
 * em outros componentes/módulos automaticamente.
 */
@Injectable({
  providedIn: 'root' // Disponibiliza o serviço em toda a aplicação
})
export class ProductService {

  // Dados simulados - em uma aplicação real, viria de uma API
  private products: Product[] = [
    {
      id: 1,
      name: 'Notebook Angular Pro',
      description: 'Um notebook potente para desenvolvimento Angular',
      price: 3500,
      category: 'Hardware',
      inStock: true
    },
    {
      id: 2,
      name: 'Curso Angular Avançado',
      description: 'Curso completo sobre Angular 16 e TypeScript',
      price: 299,
      category: 'Educação',
      inStock: true
    },
    {
      id: 3,
      name: 'TypeScript Essentials',
      description: 'Guia essencial para dominar TypeScript',
      price: 150,
      category: 'Educação',
      inStock: false
    },
    {
      id: 4,
      name: 'Angular CLI Premium',
      description: 'Ferramentas avançadas para Angular CLI',
      price: 75,
      category: 'Software',
      inStock: true
    }
  ];

  /**
   * Retorna todos os produtos
   */
  getProducts(): Observable<Product[]> {
    // Simula um delay de rede
    return of(this.products).pipe(delay(500));
  }

  /**
   * Retorna um produto por ID
   */
  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product).pipe(delay(300));
  }

  /**
   * Adiciona um novo produto
   */
  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const newProduct = {
      ...product,
      id: Math.max(...this.products.map(p => p.id)) + 1
    };
    
    this.products.push(newProduct);
    return of(newProduct).pipe(delay(400));
  }

  /**
   * Atualiza um produto existente
   */
  updateProduct(id: number, updates: Partial<Product>): Observable<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return of(null);
    }

    this.products[index] = { ...this.products[index], ...updates };
    return of(this.products[index]).pipe(delay(400));
  }

  /**
   * Remove um produto
   */
  deleteProduct(id: number): Observable<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return of(false);
    }

    this.products.splice(index, 1);
    return of(true).pipe(delay(300));
  }
}