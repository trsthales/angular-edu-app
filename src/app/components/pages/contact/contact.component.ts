import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // Dados do formulário
contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl(''),
    message: new FormControl('', Validators.required)
  });


  // Opções de assunto
  subjects = [
    { value: 'duvida', label: 'Dúvida sobre Angular' },
    { value: 'sugestao', label: 'Sugestão de melhoria' },
    { value: 'bug', label: 'Reportar bug' },
    { value: 'feedback', label: 'Feedback geral' }
  ];

  // Status do envio
  isSubmitting = false;
  isSubmitted = false;
  errorMessage = '';
    showMessage = false;

  constructor() { }

  ngOnInit(): void {
    console.log('ContactComponent inicializado');
  }

  /**
   * Manipula o envio do formulário
   */
  onSubmit(): void {
    if (!this.isFormValid()) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    // Simula envio do formulário
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
      console.log('Formulário enviado:', this.contactForm);
      
      // Reset do formulário
      this.resetForm();
    }, 2000);
  }

  /**
   * Valida se o formulário está válido
   */
  private isFormValid(): boolean {
    return this.contactForm.valid;
  }

  /**
   * Reseta o formulário
   */
  private resetForm(): void {
    this.contactForm.reset();
  }

  /**
   * Reseta o estado de submission (para permitir novo envio)
   */
  resetSubmission(): void {
    this.isSubmitted = false;
    this.errorMessage = '';
  }
}