import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/interfaces';
import { ProductService } from '../../../services/product.service';

/**
 * Componente Lista de Produtos
 * 
 * Este componente demonstra:
 * - Injeção de dependência (ProductService)
 * - Lifecycle hooks (OnInit)
 * - Observables e async pipe
 * - Tratamento de estados (loading, error, success)
 * - Routing com parâmetros
 */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  // Estados do componente
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';

  // Filtros
  searchTerm = '';
  selectedCategory = 'all';
  
  // Categorias disponíveis
  categories = ['all', 'Hardware', 'Educação', 'Software'];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * Carrega a lista de produtos
   */
  private loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
        console.log('Produtos carregados:', products.length);
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar produtos. Tente novamente.';
        this.isLoading = false;
        console.error('Erro ao carregar produtos:', error);
      }
    });
  }

  /**
   * Filtra produtos baseado na pesquisa
   */
  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || 
                             product.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  /**
   * Verifica se um produto está em estoque
   */
  isInStock(product: Product): boolean {
    return product.inStock;
  }

  /**
   * Formata o preço para exibição
   */
  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  /**
   * Obtém a classe CSS para o status do estoque
   */
  getStockStatusClass(product: Product): string {
    return product.inStock ? 'in-stock' : 'out-of-stock';
  }

  /**
   * Recarrega a lista de produtos
   */
  reloadProducts(): void {
    this.loadProducts();
  }

  /**
   * TrackBy function para otimizar performance em *ngFor
   * Permite ao Angular identificar e re-renderizar apenas itens alterados
   */
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}