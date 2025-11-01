import { Component } from '@angular/core';

/**
 * Componente Raiz da Aplicação
 * 
 * Este é o componente principal que:
 * - Contém a estrutura base da aplicação
 * - Inclui o header compartilhado
 * - Define onde as rotas serão renderizadas (router-outlet)
 * - Demonstra a arquitetura component/single-page-application
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Título da aplicação
   * Demonstrates: Property binding e interpolation
   */
  title = 'Angular Edu App';

  /**
   * Versão do Angular
   */
  angularVersion = '16.2.0';

  /**
   * Ano atual
   */
  currentYear = new Date().getFullYear();
}