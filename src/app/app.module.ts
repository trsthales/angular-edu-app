import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

/**
 * Módulos de páginas principais
 * Estes componentes são declarados diretamente no AppModule
 * pois são carregados imediatamente quando a aplicação inicia
 */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AboutModule } from './components/pages/about/about.module';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ContactModule } from './components/pages/contact/contact.module';

/**
 * Componentes compartilhados
 * Usados em toda a aplicação
 */
import { HeaderComponent } from './components/shared/header/header.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

/**
 * Serviços da aplicação
 * Disponíveis globalmente
 */
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

/**
 * Guards de rota
 * Para proteção de rotas baseado em permissões
 */
import { AuthGuard } from './guards/auth.guard';

/**
 * Rotas da aplicação
 * 
 * Demonstram:
 * - Rotas principais
 * - Lazy loading de módulos
 * - Proteção de rotas com guards
 * - Parâmetros de rota
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' // Redireciona raiz para /home
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Início - Angular Edu'
  },
  // {
  //   path: 'about',
  //   component: AboutComponent,
  //   title: 'Sobre - Angular Edu'
  // },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contato - Angular Edu'
  },
  // {
  //   path: 'products',
  //   loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule),
  //   title: 'Produtos - Angular Edu'
  // },
  // {
  //   path: 'users',
  //   loadChildren: () => import('./modules/users/users.module').then(m => m.UserModule),
  //   title: 'Usuários - Angular Edu'
  // },
  // {
  //   path: 'blog',
  //   loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule),
  //   title: 'Blog - Angular Edu'
  // },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule),
  //   canActivate: [AuthGuard],
  //   data: { requiredRole: 'admin' },
  //   title: 'Painel Admin - Angular Edu'
  // },
  {
    path: '**',
    redirectTo: '/home' // Rota coringa - qualquer rota não encontrada vai para home
  }
];

/**
 * Módulo principal da aplicação Angular
 * 
 * Este é o ponto de entrada que configura:
 * - Componentes da aplicação
 * - Módulos necessários
 * - Serviços globais
 * - Roteamento principal
 * 
 * O @NgModule decorator define:
 * - declarations: componentes que pertencem a este módulo
 * - imports: outros módulos que este módulo precisa
 * - providers: serviços disponíveis globalmente
 * - bootstrap: componente que deve ser iniciado
 */
@NgModule({
  declarations: [
    // Componentes da aplicação principal
    AppComponent,
    
    // Componentes de páginas (route components)
  HomeComponent,
  // AboutComponent,
  // ContactComponent,
    
    // Componentes compartilhados
  HeaderComponent,
  LoadingComponent
  ],
  imports: [
    // BrowserModule: funcionalidades básicas para aplicações browser
    BrowserModule,
    
    // BrowserAnimationsModule: animações do Angular
    BrowserAnimationsModule,

    // ReactiveFormsModule: módulo para formulários reativos
    ReactiveFormsModule,

  // AboutModule: módulo da página Sobre
  AboutModule,
  // ContactModule: módulo da página Contato
  ContactModule,

    // RouterModule com as rotas principais
    RouterModule.forRoot(routes, {
      enableTracing: false, // Set to true for debugging
      scrollPositionRestoration: 'top' // Scroll to top on route change
    })
  ],
  providers: [
    // Serviços disponíveis globalmente na aplicação
    ProductService,
    UserService,
    AuthGuard
  ],
  bootstrap: [
    // Componente raiz que será renderizado primeiro
    AppComponent
  ]
})
export class AppModule { 
  constructor() {
    console.log('🚀 Angular Edu App inicializada!');
    console.log('📦 AppModule carregado (sempre presente)');
  }
}