import { Component, Input } from '@angular/core';

/**
 * Componente de Loading/Spinner
 * 
 * Componente reutilizável para mostrar estado de carregamento
 * Demonstrates:
 * - Input binding (@Input)
 * - Componente presentacional (sem lógica complexa)
 * - Reutilização em diferentes contextos
 */
@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-container" [style.gap]="spacing + 'px'">
      
      <!-- Spinner -->
      <div class="spinner" [style.width]="size + 'px'" [style.height]="size + 'px'"></div>
      
      <!-- Texto opcional -->
      <span *ngIf="message" class="loading-text">{{ message }}</span>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  /**
   * Tamanho do spinner (px)
   */
  @Input() size: number = 32;

  /**
   * Mensagem opcional para mostrar junto ao spinner
   */
  @Input() message: string = '';

  /**
   * Espaçamento entre spinner e texto (px)
   */
  @Input() spacing: number = 12;
}