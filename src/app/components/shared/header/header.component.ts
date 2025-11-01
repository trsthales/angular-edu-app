import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../../../models/interfaces';

/**
 * Componente de Header/Navegação
 * 
 * Este componente demonstra:
 * - Componente compartilhado (usado em toda a aplicação)
 * - Diretivas Angular: *ngFor, routerLink, routerLinkActive
 * - Data binding bidirecional
 * - Event handling
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Items de navegação
  navItems: NavItem[] = [
    { label: 'Início', route: '/home' },
    { label: 'Sobre', route: '/about' },
    { label: 'Contato', route: '/contact' },
    { label: 'Produtos', route: '/products' },
    { label: 'Usuários', route: '/users' }
  ];

  // Estado do menu mobile
  isMobileMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Alterna o menu mobile
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Navega para uma rota
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMobileMenuOpen = false; // Fecha menu mobile após navegação
  }

  /**
   * Verifica se uma rota está ativa
   */
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}