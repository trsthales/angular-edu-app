import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

/**
 * Ponto de entrada da aplicação Angular
 * 
 * Este arquivo é responsável por:
 * 1. Inicializar o Angular no navegador
 * 2. Carregar o módulo principal da aplicação (AppModule)
 * 3. Fazer o bootstrap da aplicação
 * 
 * O platformBrowserDynamic é necessário para compilar templates Angular
 * no navegador e executar a aplicação.
 */

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));