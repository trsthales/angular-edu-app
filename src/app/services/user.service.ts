import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../models/interfaces';

/**
 * Serviço de Usuários
 * 
 * Este serviço gerencia operações relacionadas a usuários:
 * - Listar usuários
 * - Obter usuário por ID
 * - Autenticação simulada
 * - Gerenciamento de roles
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Dados simulados de usuários
  private users: User[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@example.com',
      role: 'admin',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2025-10-29')
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@example.com',
      role: 'user',
      createdAt: new Date('2024-03-20'),
      lastLogin: new Date('2025-10-28')
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro.costa@example.com',
      role: 'user',
      createdAt: new Date('2024-05-10'),
      lastLogin: new Date('2025-10-27')
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      email: 'ana.oliveira@example.com',
      role: 'guest',
      createdAt: new Date('2024-08-05'),
      lastLogin: new Date('2025-10-26')
    }
  ];

  /**
   * Retorna todos os usuários
   */
  getUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(400));
  }

  /**
   * Retorna um usuário por ID
   */
  getUserById(id: number): Observable<User | undefined> {
    const user = this.users.find(u => u.id === id);
    return of(user).pipe(delay(200));
  }

  /**
   * Autenticação simulada
   */
  login(email: string, password: string): Observable<User | null> {
    // Simula uma verificação de credenciais
    const user = this.users.find(u => u.email === email);
    
    // Simula autenticação bem-sucedida para qualquer senha
    if (user && password) {
      // Atualiza último login
      user.lastLogin = new Date();
      return of(user).pipe(delay(800));
    }
    
    return of(null).pipe(delay(400));
  }

  /**
   * Verifica se o usuário tem permissão
   */
  hasPermission(user: User | null, requiredRole: string): boolean {
    if (!user) return false;
    
    // Hierarquia de roles: admin > user > guest
    const roleHierarchy: Record<'admin' | 'user' | 'guest', number> = { admin: 3, user: 2, guest: 1 };
    return roleHierarchy[user.role as 'admin' | 'user' | 'guest'] >= roleHierarchy[requiredRole as 'admin' | 'user' | 'guest'];
  }

  /**
   * Atualiza dados do usuário
   */
  updateUser(id: number, updates: Partial<User>): Observable<User | null> {
    const index = this.users.findIndex(u => u.id === id);
    
    if (index === -1) {
      return of(null);
    }

    this.users[index] = { ...this.users[index], ...updates };
    return of(this.users[index]).pipe(delay(300));
  }
}