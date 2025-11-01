import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/interfaces';
import { ProductService } from '../../../services/product.service';

/**
 * Componente Detalhes do Produto
 * 
 * Este componente demonstra:
 * - Parâmetros de rota (ActivatedRoute)
 * - Navegação programática (Router)
 * - Observable pattern
 * - Error handling
 */
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  // Estados do componente
  product: Product | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  /**
   * Carrega o produto baseado no ID da rota
   */
  private loadProduct(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Pega o ID da rota
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(productId) || productId <= 0) {
      this.errorMessage = 'ID do produto inválido.';
      this.isLoading = false;
      return;
    }

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product || null;
        this.isLoading = false;
        
        if (!product) {
          this.errorMessage = 'Produto não encontrado.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar detalhes do produto.';
        this.isLoading = false;
        console.error('Erro ao carregar produto:', error);
      }
    });
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
   * Volta para a lista de produtos
   */
  goBack(): void {
    this.router.navigate(['/products']);
  }

  /**
   * Recarrega os detalhes do produto
   */
  reloadProduct(): void {
    this.loadProduct();
  }
}