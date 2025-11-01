/**
 * Modelos de dados da aplicação Angular
 * 
 * Estes interfaces definem a estrutura dos dados que serão utilizados
 * em toda a aplicação, garantindo type safety e consistência.
 */

/**
 * Interface para produtos
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  inStock: boolean;
}

/**
 * Interface para usuários
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  lastLogin?: Date;
}

/**
 * Interface para navegação
 */
export interface NavItem {
  label: string;
  route: string;
  icon?: string;
  children?: NavItem[];
}