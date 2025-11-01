import { Component, OnInit } from '@angular/core';

/**
 * Componente Página Inicial (Home)
 * 
 * Este componente demonstra:
 * - Componente de página (route component)
 * - Lifecycle hooks (OnInit)
 * - Template-driven content
 * - Interpolation e property binding
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Dados da página
  features = [
    {
      title: 'Módulos',
      description: 'Aprenda sobre modularização e lazy loading',
      icon: '📦'
    },
    {
      title: 'Componentes',
      description: 'Entenda componentes, templates e data binding',
      icon: '🧩'
    },
    {
      title: 'Rotas',
      description: 'Navegação e guards de rota',
      icon: '🗺️'
    },
    {
      title: 'Serviços',
      description: 'Injeção de dependência e lógica de negócio',
      icon: '⚙️'
    }
  ];

  stats = [
    { label: 'Componentes', value: 15 },
    { label: 'Módulos', value: 4 },
    { label: 'Serviços', value: 3 },
    { label: 'Rotas', value: 8 }
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('HomeComponent inicializado');
  }

  /**
   * Acción executada ao clicar no CTA principal
   */
  onGetStarted(): void {
    console.log('Redirecionando para produtos...');
  }
}