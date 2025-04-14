import { Component, EventEmitter, Input, OnInit, Output, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-calendar-confirm-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './calendar-confirm-modal.component.html',
  styleUrls: ['./calendar-confirm-modal.component.scss']
})
export class CalendarConfirmModalComponent implements OnInit {
  @Input() abrirModal = new EventEmitter<Date>(); // Ej: "Jueves 17 de abril, 18:00h"
  @Output() confirmar = new EventEmitter<{ nombre: string, empresa: string, email: string, fecha: Date }>();

  destroyRef = inject(DestroyRef);

  mostrarModalConfirmacion = false;
  fechaSeleccionada: Date | null = null;
  datosUsuario!: FormGroup;

  constructor(public  translate: TranslateService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.datosUsuario = this.fb.group({
      nombre: ['', Validators.required],
      empresa: [''],
      email: ['', [Validators.required, Validators.email]]
    });
    this.abrirModal.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (fecha) => {
        console.log(fecha);
        this.abrirModalConfirmacion(fecha)
      }
    })
  }

  abrirModalConfirmacion(fecha: Date) {
    this.fechaSeleccionada = fecha;
    this.mostrarModalConfirmacion = true;
  }


  confirmarReunion() {
    console.log(this.datosUsuario);

    if (this.datosUsuario.valid) {
      const datos = this.datosUsuario.value;
      this.confirmar.emit({
        ...datos,
        fecha: this.fechaSeleccionada
      })
      // Aquí iría la llamada a la API de Google Calendar en el futuro
      this.mostrarModalConfirmacion = false;
      this.fechaSeleccionada = null;
    }
  }
  cancelarReunion() {
    this.mostrarModalConfirmacion = false;
  }

  get diaFormateado() {
    return this.fechaSeleccionada?.toLocaleDateString(this.translate.currentLang, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

}
