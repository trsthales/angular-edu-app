
# Angular Edu App

O **Angular Edu App** é um projeto educacional criado para quem deseja aprender Angular na prática, com exemplos reais, código comentado e estrutura moderna. Ideal para iniciantes, estudantes e profissionais que querem revisar ou experimentar os principais conceitos do framework.

## 🎯 Objetivo do Projeto

O objetivo é proporcionar um ambiente de aprendizado prático, mostrando:
- **Como estruturar um projeto Angular moderno**
- **Organização por módulos e componentes**
- **Navegação com rotas e lazy loading**
- **Uso de serviços, injeção de dependência e boas práticas**
- **Exemplos comentados e código didático**

**Diferenciais:**
- Código limpo e comentado
- Estrutura modular e escalável
- Foco em aprendizado progressivo
- Pronto para ser expandido com novas funcionalidades

**Público-alvo:**
- Quem está começando com Angular
- Quem quer revisar conceitos fundamentais
- Quem busca exemplos práticos para estudo ou ensino

## 🏗️ Arquitetura da Aplicação

### Estrutura de Módulos

```
src/app/
├── modules/           # Feature Modules (Lazy Loaded)
│   ├── products/      # Módulo de Produtos
│   └── users/         # Módulo de Usuários
├── components/
│   ├── shared/        # Componentes reutilizáveis
│   ├── pages/         # Páginas principais
│   ├── products/      # Componentes de produtos
│   └── users/         # Componentes de usuários
├── services/          # Serviços (Lógica de negócio)
├── guards/           # Route Guards
└── models/           # Interfaces e tipos
```

### Módulos Principais

#### 1. **AppModule** (Módulo Raiz)
- Componentes sempre visíveis (Header, Footer)
- Rotas principais
- Serviços globais
- Configuração inicial da aplicação

#### 2. **ProductsModule** (Lazy Loading)
- **Listagem de produtos** com filtros
- **Detalhes do produto** com parâmetros de rota
- **ProductService** para gerenciamento de dados
- Demonstrates: Observables, Error Handling, Loading States

#### 3. **UserModule** (Lazy Loading)
- **Lista de usuários** com diferentes roles
- **Perfis de usuário** detalhados
- **UserService** para operações CRUD
- Demonstrates: Role-based UI, Data Filtering, Async Operations

## 🎨 Conceitos Demonstrados

### Componentes
- **Lifecycle Hooks**: OnInit, constructor
- **Data Binding**: Interpolation, Property binding, Event binding
- **Diretivas**: *ngFor, *ngIf, [ngClass]
- **Pipes**: date, currency, custom pipes
- **Component Communication**: Input/Output, Services

### Serviços
- **Dependency Injection**: @Injectable, providedIn: 'root'
- **Observable Pattern**: RxJS, subscribe/unsubscribe
- **Error Handling**: Try-catch, error states
- **State Management**: Local component state, service state

### Roteamento
- **Lazy Loading**: Carregamento sob demanda de módulos
- **Route Guards**: AuthGuard para proteção de rotas
- **Parameters**: Parâmetros de rota com ActivatedRoute
- **Child Routes**: Rotas aninhadas
- **Wildcards**: ** (catch-all) routes

### Padrões e Boas Prátivas
- **Single Responsibility**: Cada componente tem uma responsabilidade
- **Separation of Concerns**: Separação entre UI e lógica
- **DRY (Don't Repeat Yourself)**: Componentes reutilizáveis
- **TrackBy Functions**: Otimização de performance
- **Loading/Error States**: UX otimizada

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

### Instalação
```bash
# Clone o repositório (ou use os arquivos locais)
cd angular-edu-app

# Instale as dependências
npm install

# Execute a aplicação
npm start
```

### Acesso
Abra seu navegador em: `http://localhost:4200`


## 📱 Funcionalidades

### ✅ Pronto
- Estrutura modular e organização por funcionalidade
- Rotas principais funcionando (Home, Sobre, Contato)
- Página inicial com cards explicativos
- Página Sobre com informações do projeto
- Página de Contato com interação simples (mensagem ao clicar)
- Componentes compartilhados (Header, Loading)

### � Em desenvolvimento
- Formulário de contato completo com validação
- Módulo de Produtos (listagem, detalhes, filtros)
- Módulo de Usuários (listagem, perfis, permissões)
- Autenticação e proteção de rotas
- Integração com API externa
- Estados de loading e erro aprimorados

---

## 🛠️ Tecnologias

- **Angular 16**: Framework principal
- **TypeScript**: Tipagem e recursos modernos
- **RxJS**: Programação reativa
- **SCSS**: Pré-processador CSS
- **Angular CLI**: Ferramentas de desenvolvimento

## 💡 Pontos de Estudo

### 1. **Módulos e Lazy Loading**
```typescript
// Produtos são carregados apenas quando necessário
{
  path: 'products',
  loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
}
```

### 2. **Serviços e Injeção de Dependência**
```typescript
@Injectable({
  providedIn: 'root' // Disponível globalmente
})
export class ProductService {
  constructor(private http: HttpClient) {}
}
```

### 3. **Route Guards**
```typescript
{
  path: 'admin',
  canActivate: [AuthGuard],
  data: { requiredRole: 'admin' }
}
```

### 4. **Tracking para Performance**
```typescript
trackByProductId(index: number, product: Product): number {
  return product.id;
}
```

### 5. **Error Handling**
```typescript
.subscribe({
  next: (data) => { /* sucesso */ },
  error: (error) => { /* tratamento de erro */ }
});
```

## 📚 Conceitos Explicados

### Módulos (Modules)
- **AppModule**: Módulo raiz da aplicação
- **Feature Modules**: Módulos de funcionalidade organizados por domínio
- **Lazy Loading**: Carregamento sob demanda para melhor performance
- **Shared Modules**: Módulos compartilhados entre funcionalidades

### Componentes (Components)
- **Page Components**: Componentes de páginas principais
- **Feature Components**: Componentes específicos de funcionalidades
- **Shared Components**: Componentes reutilizáveis (Header, Loading)
- **Lifecycle Hooks**: Métodos executados em momentos específicos

### Serviços (Services)
- **Business Logic**: Lógica de negócio separada da apresentação
- **Data Management**: Gerenciamento de estado e dados
- **Dependency Injection**: Sistema automático de injeção
- **Observable Pattern**: Programação reativa com RxJS

### Rotas (Routes)
- **Navigation**: Sistema de navegação SPA
- **Parameters**: Passagem de dados via URL
- **Guards**: Proteção e controle de acesso
- **Lazy Loading**: Carregamento otimizado de módulos

## 🎓 Próximos Passos

Para aprofundar seus estudos:

1. **Implemente guards mais complexos** (CanDeactivate, Resolve)
2. **Adicione interceptors HTTP** para requisições
3. **Implemente testes unitários** com Jasmine/Karma
4. **Adicione internacionalização** (i18n)
5. **Implemente cache de dados** com RxJS
6. **Adicione animações** com Angular Animations
7. **Implemente lazy loading** de imagens
8. **Adicione Progressive Web App** (PWA) features

## 📝 Licença

Esta aplicação é educacional e livre para uso e estudo.

---

**Desenvolvido com ❤️ para fins educacionais**  
*Demonstrando as melhores práticas do Angular 16*