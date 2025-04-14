import { Component, Input, EventEmitter, OnInit, inject, DestroyRef, ViewChild, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CalendarConfirmModalComponent } from '../calendar-confirm-modal/calendar-confirm-modal.component';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, CalendarConfirmModalComponent],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  constructor(private translate: TranslateService) { }
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  destroyRef = inject(DestroyRef);

  @Input() openCalendar = new EventEmitter();
  @Output() abrirModalForm = new EventEmitter();
  mostrarCalendario = false;
  currentView: string = 'dayGridMonth';
  diasDisponibles = ['2025-04-17', '2025-04-20'];
  selectedEventStart: string | null = null;
  calendarOptions!: CalendarOptions;
  availableText = ''
  mostrarModalConfirmacion = false;
  fechaSeleccionadaBonita: Date | null = null;


  ngOnInit(): void {
    this.openCalendar.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.setCalendarOptions();
      this.mostrarCalendario = true;
      this.nonScrollAdded();
    });
  }

  nonScrollAdded() {
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
  }

  nonScrollRemove() {
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
  }

  onDateClick(dateStr: string) {
    const calendarApi = this.calendarComponent.getApi();
    const diaConEventos = this.diasDisponibles.includes(dateStr);
    if (diaConEventos && this.currentView === 'dayGridMonth') {
      calendarApi.changeView('timeGridDay', dateStr);
    }
  }

  cerrarConAnimacion(element: HTMLElement) {
    element.classList.add('closing');
    setTimeout(() => {
      this.mostrarCalendario = false;
      this.nonScrollRemove();
    }, 300);
  }

  setCalendarOptions() {
    const locale = this.translate.currentLang === 'en' ? enLocale : esLocale;
    const available = this.translate.instant('calendar.available');
    const selected = this.translate.instant('calendar.selected');

    this.calendarOptions = {
      viewDidMount: (arg) => {
        this.currentView = arg.view.type;
        setTimeout(() => {
          this.calendarComponent?.getApi()?.refetchEvents();
        });
      },
      dateClick: (info) => this.onDateClick(info.dateStr),
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      height: '100%',
      locale: this.translate.currentLang,
      timeZone: 'local',
      locales: [locale],
      hiddenDays: [0, 6],
      allDaySlot: false,
      slotMinTime: '10:00:00',
      slotMaxTime: '20:00:00',
      businessHours: [
        { daysOfWeek: [1, 2, 3, 4, 5], startTime: '10:00', endTime: '14:00' },
        { daysOfWeek: [1, 2, 3, 4, 5], startTime: '18:00', endTime: '20:00' }
      ],
      eventSources: [
        {
          events: (info, successCallback) => {
            if (this.currentView === 'dayGridMonth') {
              successCallback(this.diasDisponibles.map(dia => ({
                start: dia,
                display: 'background',
                color: '#4ade80'
              })));
            } else {
              successCallback([]);
            }
          }
        },
        {
          events: (info, successCallback) => {
            if (this.currentView === 'timeGridDay') {
              const eventos = [
                {
                  title: available,
                  start: '2025-04-17T10:00:00',
                  end: '2025-04-17T11:00:00',
                  color: 'rgb(74, 222, 128, 0.3)'
                },
                {
                  title: available,
                  start: '2025-04-17T18:00:00',
                  end: '2025-04-17T19:00:00',
                  color: 'rgb(74, 222, 128, 0.3)'
                }
              ];
              successCallback(eventos.map(ev => ({
                ...ev,
                extendedProps: {
                  seleccionado: new Date(this.selectedEventStart!).toISOString() === new Date(ev.start).toISOString()
                }
              })));
            } else {
              successCallback([]);
            }
          }
        }
      ],
      editable: false,
      selectable: false,
      customButtons: {
        cerrarCalendario: {
          text: '✕',
          click: () => {
            const modalRef = document.getElementById('modalRef')!;
            this.cerrarConAnimacion(modalRef);
          }
        },
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth cerrarCalendario'
      },
      eventClick: (info) => {
        if (this.selectedEventStart === info.event.startStr) return;

        this.selectedEventStart = info.event.startStr;
        document.querySelectorAll('.tech-selected').forEach(el => el.classList.remove('tech-selected'));
        if (info.el) info.el.classList.add('tech-selected');
        setTimeout(() => {
          this.calendarComponent.getApi().refetchEvents();
          this.fechaSeleccionadaBonita = new Date(info.event.startStr);
          this.mostrarModalConfirmacion = true;
        }, 300);
      },
      eventContent: (arg) => {
        const seleccionado = arg.event.extendedProps['seleccionado'];

        const container = document.createElement('div');
        container.classList.add('fc-event-custom-content');




        const time = document.createElement('div');
        time.innerHTML = arg.timeText;
        time.classList.add('fc-event-time');

        const title = document.createElement('div');
        title.innerHTML = arg.event.title;
        title.classList.add('fc-event-title');

        if (seleccionado) {
          // Confirm Button
          const confirmButton = document.createElement('button');
          confirmButton.innerHTML = this.translate.instant('calendar.confirm');
          confirmButton.classList.add('selected-confirm-button');
          confirmButton.onclick = () => this.abrirModalForm.emit(arg.event.start);
          container.appendChild(confirmButton);

          // Badge
          const badge = document.createElement('span');
          badge.innerText = selected;
          badge.classList.add('selected-label');
          container.appendChild(badge);
        }

        container.appendChild(time);
        container.appendChild(title);

        return { domNodes: [container] };
      }
    };
  }

  onConfirmar(datos: { nombre: string; empresa: string; email: string, fecha: Date }) {
    console.log(datos);

    this.mostrarModalConfirmacion = false;
  }
}
