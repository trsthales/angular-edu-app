import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/interfaces';
import { UserService } from '../../../services/user.service';

/**
 * Componente Lista de Usuários
 * 
 * Este componente demonstra:
 * - Listagem de dados de usuários
 * - Filtros e pesquisa
 * - Diferentes roles de usuário
 * - Serviço de usuários
 */
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  // Estados do componente
  users: User[] = [];
  isLoading = true;
  errorMessage = '';

  // Filtros
  searchTerm = '';
  selectedRole = 'all';

  // Roles disponíveis
  roles = [
    { value: 'all', label: 'Todos os usuários' },
    { value: 'admin', label: 'Administradores' },
    { value: 'user', label: 'Usuários' },
    { value: 'guest', label: 'Visitantes' }
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Carrega a lista de usuários
   */
  private loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
        console.log('Usuários carregados:', users.length);
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar usuários. Tente novamente.';
        this.isLoading = false;
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  /**
   * Filtra usuários baseado na pesquisa e role
   */
  get filteredUsers(): User[] {
    return this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesRole = this.selectedRole === 'all' || 
                         user.role === this.selectedRole;
      
      return matchesSearch && matchesRole;
    });
  }

  /**
   * Obtém a classe CSS para o role do usuário
   */
  getUserRoleClass(role: string): string {
    return `role-${role}`;
  }

  /**
   * Obtém o label do role
   */
  getRoleLabel(role: string): string {
    const roleInfo = this.roles.find(r => r.value === role);
    return roleInfo?.label || role;
  }

  /**
   * Formata a data para exibição
   */
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  }

  /**
   * Verifica se o usuário está online (último login recente)
   */
  isOnline(user: User): boolean {
    if (!user.lastLogin) return false;
    
    const lastLogin = new Date(user.lastLogin);
    const now = new Date();
    const diffHours = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);
    
    return diffHours < 24; // Considera online se fez login nas últimas 24h
  }

  /**
   * Recarrega a lista de usuários
   */
  reloadUsers(): void {
    this.loadUsers();
  }

  /**
   * TrackBy function para otimizar performance em *ngFor
   */
  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}