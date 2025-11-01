import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  angularConcepts = [
    {
      concept: 'Módulos (Modules)',
      description: 'Organizam a aplicação em blocos funcionais',
      example: 'ProductsModule, UserModule'
    },
    {
      concept: 'Componentes (Components)',
      description: 'Unidades visuais reutilizáveis',
      example: 'HeaderComponent, ProductListComponent'
    },
    {
      concept: 'Serviços (Services)',
      description: 'Lógica de negócio compartilhada',
      example: 'ProductService, UserService'
    },
    {
      concept: 'Rotas (Routes)',
      description: 'Navegação e gerenciamento de URLs',
      example: 'Lazy loading, Route guards'
    },
    {
      concept: 'Data Binding',
      description: 'Conexão entre dados e interface',
      example: 'Interpolation, Property binding, Event binding'
    },
    {
      concept: 'Diretivas (Directives)',
      description: 'Modificam o DOM dinamicamente',
      example: '*ngFor, *ngIf, routerLink'
    }
  ];

  currentTime = new Date();

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
    this.currentTime = new Date();
  }, 1000);
  }
}