import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/interfaces';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  // Estados do componente
  user: User | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  /**
   * Carrega o usuário baseado no ID da rota
   */
  private loadUser(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const userId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(userId) || userId <= 0) {
      this.errorMessage = 'ID do usuário inválido.';
      this.isLoading = false;
      return;
    }

    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user || null;
        this.isLoading = false;
        
        if (!user) {
          this.errorMessage = 'Usuário não encontrado.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar dados do usuário.';
        this.isLoading = false;
        console.error('Erro ao carregar usuário:', error);
      }
    });
  }

  /**
   * Formata a data para exibição
   */
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }

  /**
   * Obtém a classe CSS para o role
   */
  getUserRoleClass(role: string): string {
    return `role-${role}`;
  }

  /**
   * Obtém o label do role
   */
  getRoleLabel(role: string): string {
    const roleLabels: { [key: string]: string } = {
      'admin': 'Administrador',
      'user': 'Usuário',
      'guest': 'Visitante'
    };
    return roleLabels[role] || role;
  }

  /**
   * Verifica se o usuário está online
   */
  isOnline(user: User): boolean {
    if (!user.lastLogin) return false;
    
    const lastLogin = new Date(user.lastLogin);
    const now = new Date();
    const diffHours = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);
    
    return diffHours < 24;
  }

  /**
   * Calcula há quanto tempo foi o último login
   */
  getLastLoginTime(user: User): string {
    if (!user.lastLogin) return 'Nunca';

    const lastLogin = new Date(user.lastLogin);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return 'Há menos de 1 hora';
    } else if (diffHours < 24) {
      return `Há ${diffHours} hora(s)`;
    } else if (diffDays < 7) {
      return `Há ${diffDays} dia(s)`;
    } else {
      return `Há ${Math.floor(diffDays / 7)} semana(s)`;
    }
  }

  /**
   * Volta para a lista de usuários
   */
  goBack(): void {
    this.router.navigate(['/users']);
  }

  /**
   * Recarrega os dados do usuário
   */
  reloadUser(): void {
    this.loadUser();
  }
}