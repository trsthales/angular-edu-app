# Documentação da API - Angular Edu App

## Visão Geral

Esta aplicação Angular demonstra o uso de serviços para simular uma API REST. Os serviços implementam métodos CRUD (Create, Read, Update, Delete) usando Observables do RxJS.

## Serviços Implementados

### 1. ProductService

Responsável pelo gerenciamento de produtos da aplicação.

#### Métodos Disponíveis

##### `getProducts(): Observable<Product[]>`
- **Descrição**: Retorna todos os produtos disponíveis
- **Retorna**: Observable com array de produtos
- **Simulação**: Delay de 500ms para simular chamada de rede

```typescript
this.productService.getProducts().subscribe(products => {
  console.log(products);
});
```

##### `getProductById(id: number): Observable<Product | undefined>`
- **Descrição**: Retorna um produto específico pelo ID
- **Parâmetros**: `id` - ID do produto
- **Retorna**: Observable com o produto ou undefined se não encontrado
- **Simulação**: Delay de 300ms

```typescript
this.productService.getProductById(1).subscribe(product => {
  if (product) {
    console.log(`Produto encontrado: ${product.name}`);
  }
});
```

##### `addProduct(product: Omit<Product, 'id'>): Observable<Product>`
- **Descrição**: Adiciona um novo produto
- **Parâmetros**: `product` - Dados do produto sem o ID
- **Retorna**: Observable com o produto criado (incluindo ID gerado)
- **Simulação**: Delay de 400ms

```typescript
const newProduct = {
  name: 'Novo Produto',
  description: 'Descrição do produto',
  price: 100,
  category: 'Categoria',
  inStock: true
};

this.productService.addProduct(newProduct).subscribe(product => {
  console.log(`Produto criado com ID: ${product.id}`);
});
```

##### `updateProduct(id: number, updates: Partial<Product>): Observable<Product | null>`
- **Descrição**: Atualiza um produto existente
- **Parâmetros**: 
  - `id` - ID do produto a ser atualizado
  - `updates` - Objeto com campos a serem atualizados
- **Retorna**: Observable com o produto atualizado ou null se não encontrado
- **Simulação**: Delay de 400ms

```typescript
this.productService.updateProduct(1, { price: 150, inStock: false })
  .subscribe(product => {
    if (product) {
      console.log('Produto atualizado:', product);
    }
  });
```

##### `deleteProduct(id: number): Observable<boolean>`
- **Descrição**: Remove um produto
- **Parâmetros**: `id` - ID do produto a ser removido
- **Retorna**: Observable com boolean indicando sucesso
- **Simulação**: Delay de 300ms

```typescript
this.productService.deleteProduct(1).subscribe(success => {
  if (success) {
    console.log('Produto removido com sucesso');
  }
});
```

### 2. UserService

Responsável pelo gerenciamento de usuários da aplicação.

#### Métodos Disponíveis

##### `getUsers(): Observable<User[]>`
- **Descrição**: Retorna todos os usuários
- **Retorna**: Observable com array de usuários
- **Simulação**: Delay de 400ms

```typescript
this.userService.getUsers().subscribe(users => {
  console.log(`Total de usuários: ${users.length}`);
});
```

##### `getUserById(id: number): Observable<User | undefined>`
- **Descrição**: Retorna um usuário específico pelo ID
- **Parâmetros**: `id` - ID do usuário
- **Retorna**: Observable com o usuário ou undefined
- **Simulação**: Delay de 200ms

```typescript
this.userService.getUserById(1).subscribe(user => {
  if (user) {
    console.log(`Usuário: ${user.name} (${user.role})`);
  }
});
```

##### `login(email: string, password: string): Observable<User | null>`
- **Descrição**: Simula autenticação de usuário
- **Parâmetros**: 
  - `email` - Email do usuário
  - `password` - Senha (aceita qualquer senha para simulação)
- **Retorna**: Observable com usuário autenticado ou null
- **Simulação**: Delay de 800ms

```typescript
this.userService.login('usuario@exemplo.com', 'senha123')
  .subscribe(user => {
    if (user) {
      console.log(`Login bem-sucedido: ${user.name}`);
    } else {
      console.log('Credenciais inválidas');
    }
  });
```

##### `hasPermission(user: User | null, requiredRole: string): boolean`
- **Descrição**: Verifica se usuário tem permissão para ação
- **Parâmetros**: 
  - `user` - Usuário a ser verificado
  - `requiredRole` - Role mínimo necessário
- **Retorna**: Boolean indicando se tem permissão

```typescript
const hasAccess = this.userService.hasPermission(currentUser, 'admin');
if (hasAccess) {
  console.log('Usuário pode acessar área administrativa');
}
```

##### `updateUser(id: number, updates: Partial<User>): Observable<User | null>`
- **Descrição**: Atualiza dados de um usuário
- **Parâmetros**: 
  - `id` - ID do usuário
  - `updates` - Campos a serem atualizados
- **Retorna**: Observable com usuário atualizado ou null
- **Simulação**: Delay de 300ms

```typescript
this.userService.updateUser(1, { name: 'Nome Atualizado' })
  .subscribe(user => {
    if (user) {
      console.log('Usuário atualizado:', user);
    }
  });
```

## Estruturas de Dados

### Product Interface
```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  inStock: boolean;
}
```

### User Interface
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  lastLogin?: Date;
}
```

## Tratamento de Erros

Todos os serviços incluem tratamento básico de erros:

```typescript
// Exemplo de uso com tratamento de erro
this.productService.getProducts().subscribe({
  next: (products) => {
    console.log('Produtos carregados:', products);
  },
  error: (error) => {
    console.error('Erro ao carregar produtos:', error);
    // Implementar tratamento específico aqui
  }
});
```

## Observables e Async Operations

Os serviços retornam Observables, permitindo:

### 1. **Reactive Programming**
```typescript
// Combinação de observables
combineLatest([
  this.productService.getProducts(),
  this.userService.getUsers()
]).subscribe(([products, users]) => {
  // Ambos os dados estão disponíveis
});
```

### 2. **Error Handling**
```typescript
// Captura de erros específicos
this.productService.getProductById(999).subscribe({
  next: (product) => {
    // Produto encontrado
  },
  error: (error) => {
    if (error.status === 404) {
      console.log('Produto não encontrado');
    }
  }
});
```

### 3. **Loading States**
```typescript
// Gerenciamento de estados de loading
this.isLoading = true;
this.productService.getProducts().subscribe({
  next: () => {
    this.isLoading = false;
  },
  error: () => {
    this.isLoading = false;
  }
});
```

## Performance e Otimização

### TrackBy Functions
```typescript
// No template: *ngFor="let product of products; trackBy: trackByProductId"
trackByProductId(index: number, product: Product): number {
  return product.id;
}
```

### Async Pipe
```typescript
<!-- No template -->
<div *ngFor="let product of products$ | async">
  {{ product.name }}
</div>

// No componente
products$ = this.productService.getProducts();
```

## Mock Data

Os serviços usam dados simulados em memória. Para uma aplicação real, substituir por:

```typescript
// Usando HttpClient para API real
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.exemplo.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
```

## Rate Limiting e Debouncing

Para operações intensivas:

```typescript
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// No componente
searchTerms.pipe(
  debounceTime(300),
  distinctUntilChanged()
).subscribe(term => {
  this.productService.searchProducts(term).subscribe(products => {
    this.filteredProducts = products;
  });
});
```

## Configuração de Headers

Para autenticação:

```typescript
// Em um HTTP Interceptor
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    
    return next.handle(authReq);
  }
}
```

Esta documentação fornece uma visão completa dos serviços implementados na aplicação educacional Angular.