import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';

/**
 * Guarda de Rota (Route Guard)
 * 
 * Este guard demonstra como:
 * - Proteger rotas baseado em permissões
 * - Verificar autenticação de usuários
 * - Controlar acesso a diferentes áreas da aplicação
 * - Redirecionar usuários não autorizados
 * 
 * Implements CanActivate: Permite acesso à rota apenas se a condição for atendida
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Método chamado quando a rota é acessada
   * 
   * @param route - Informações sobre a rota solicitada
   * @param state - Estado atual do roteador
   * @returns true se pode acessar, false se deve ser redirecionado
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // Simula um usuário logado (em uma aplicação real, verificaria token/sessão)
    const currentUser = this.getCurrentUser();

    // Define o role mínimo necessário para esta rota
    const requiredRole = route.data?.['requiredRole'] || 'guest';

    if (currentUser && this.userService.hasPermission(currentUser, requiredRole)) {
      return true; // Permitir acesso
    }

    // Redireciona para página de login ou página inicial
    console.log(`Acesso negado. Role ${currentUser?.role || 'não logado'} não pode acessar rota que requer ${requiredRole}`);
    this.router.navigate(['/login']);
    return false; // Negar acesso
  }

  /**
   * Simula obtenção do usuário atual
   * Em uma aplicação real, verificaria token, sessão, etc.
   */
  private getCurrentUser(): any {
    // Simula usuário logado com role 'user'
    return {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@example.com',
      role: 'user'
    };
  }
}