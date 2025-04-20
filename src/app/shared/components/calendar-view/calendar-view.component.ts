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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CalendarConfirmModalComponent } from '../calendar-confirm-modal/calendar-confirm-modal.component';
import { CalendarService } from '../../../services/calendar.service';
import { ToastMessageService } from '../../services/toast-message-service/toast-message.service';
import { DayAvailability, IDiaConSlots, SlotAvailability } from './calendar.interface';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from '../../../services/spinner-loading.service';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, CalendarConfirmModalComponent, TranslateModule],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  constructor(private translate: TranslateService, private calendarService: CalendarService, private toastService: ToastMessageService, private loadingService: LoadingService) { }
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  destroyRef = inject(DestroyRef);

  @Input() openCalendar = new EventEmitter();
  @Output() abrirModalForm = new EventEmitter();
  mostrarCalendario = false;
  currentView: string = 'dayGridMonth';
  diasDisponibles: IDiaConSlots[] = [];
  selectedEventStart: string | null = null;
  calendarOptions!: CalendarOptions;
  availableText = ''
  mostrarModalConfirmacion = false;
  fechaSeleccionadaBonita: Date | null = null;

  isLoading = false;

  ngOnInit(): void {
    this.openCalendar.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async () => {
      await this.setCalendarOptions();
      this.mostrarCalendario = true;
      this.nonScrollAdded();
    });
  }

  async getDaysAndSlots() {
    return firstValueFrom(
      this.calendarService.getDiasConSlots().pipe(takeUntilDestroyed(this.destroyRef))
    )
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
    const dia = this.diasDisponibles.find(d => d.fecha === dateStr);
    if (dia && this.currentView === 'dayGridMonth') {
      calendarApi.changeView('timeGridDay', dateStr);
    }
  }

  cerrarConAnimacion() {
    const modalRef = document.getElementById('modalRef')!;
    modalRef.classList.add('closing');
    setTimeout(() => {
      this.mostrarCalendario = false;
      this.nonScrollRemove();
    }, 300);
  }

  async setCalendarOptions() {
    this.diasDisponibles = await this.getDaysAndSlots();

    const locale = this.translate.currentLang === 'en' ? enLocale : esLocale;
    const available = this.translate.instant('calendar.available');
    const busy = this.translate.instant('calendar.busy');
    const holiday = this.translate.instant('calendar.holiday');
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
        { daysOfWeek: [1, 2, 3, 4, 5], startTime: '10:00', endTime: '13:00' },
        { daysOfWeek: [1, 2, 3, 4, 5], startTime: '17:00', endTime: '20:00' }
      ],
      eventSources: [
        {
          events: (info, successCallback) => {
            if (this.currentView === 'dayGridMonth') {
              const eventosPorDia = this.diasDisponibles.map(d => {

                const color =
                  d.status === DayAvailability.Complete ? 'rgba(255, 42, 0, 0.3)' :
                    d.status === DayAvailability.Holiday ? '#374151' :
                      'rgb(70 131 92 / 38%)';

                const title =
                  d.status === DayAvailability.Complete ? this.translate.instant('calendar.busy') :
                    d.status === DayAvailability.Holiday ? this.translate.instant('calendar.holiday') :
                      this.translate.instant('calendar.available');

                return {
                  title,
                  start: d.fecha,
                  display: 'background',
                  color,
                  extendedProps: {
                    tipo: d.status,
                    label: title,
                    holidayName: d.holidayName ?? ''
                  }
                };
              });

              successCallback(eventosPorDia);
            } else {
              successCallback([]);
            }
          }
        },
        {
          events: (info, successCallback) => {
            if (this.currentView === 'timeGridDay') {
              const fechaActual = info.startStr.slice(0, 10); // 'YYYY-MM-DD'
              const slots = this.diasDisponibles
                .filter(d => d.fecha === fechaActual)
                .flatMap(d => d.slots);

              const eventos = slots.map(slot => ({
                title: slot.title === SlotAvailability.Available ? available : slot.title === SlotAvailability.Holiday ? holiday : busy,
                start: slot.start,
                end: slot.end,
                color: slot.title === SlotAvailability.Available ? 'rgba(74, 222, 128, 0.3)' : slot.title === SlotAvailability.Holiday ? '#374151' : 'rgba(255, 42, 0, 0.3)',
                display: 'block',
                extendedProps: {
                  tipo: slot.title,
                  seleccionado: slot.title === SlotAvailability.Available && new Date(this.selectedEventStart!).toISOString() === new Date(slot.start).toISOString()
                }
              }));

              successCallback(eventos);
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
            this.cerrarConAnimacion();
          }
        },
      },
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth cerrarCalendario'
      },
      eventClick: (info) => {
        const tipo = info.event.extendedProps['tipo'];

        if (tipo !== DayAvailability.Available) return;

        // Ya está seleccionado el mismo => no mostrar modal otra vez
        if (this.selectedEventStart === info.event.startStr) {
          // Solo refrescamos visual
          this.calendarComponent.getApi().refetchEvents();
          return;
        }

        this.selectedEventStart = info.event.startStr;
        document.querySelectorAll('.tech-selected').forEach(el => el.classList.remove('tech-selected'));

        if (info.el) info.el.classList.add('tech-selected');

        setTimeout(() => {
          this.calendarComponent.getApi().refetchEvents();
          this.fechaSeleccionadaBonita = new Date(info.event.startStr);
          this.mostrarModalConfirmacion = true;
        }, 100);
      },

      eventContent: (arg) => {
        const tipo = arg.event.extendedProps['tipo'];
        const festivoNombre = arg.event.extendedProps['holidayName'];
        const seleccionado = arg.event.extendedProps['seleccionado'];

        const container = document.createElement('div');
        container.classList.add('fc-event-custom-content');

        const time = document.createElement('div');
        time.innerHTML = arg.timeText;
        time.classList.add('fc-event-time');

        const title = document.createElement('div');
        title.innerHTML = arg.event.title;
        title.classList.add('fc-event-title');

        const subtitle = document.createElement('div');
        if (tipo === DayAvailability.Holiday && festivoNombre) {
          subtitle.innerText = festivoNombre;
          subtitle.classList.add('fc-event-subtitle');
          subtitle.style.fontSize = '0.75rem';
          subtitle.style.opacity = '0.8';
          subtitle.style.margin = '1rem';
        }

        if (seleccionado) {
          // Confirm Button
          const confirmButton = document.createElement('button');
          confirmButton.innerHTML = this.translate.instant('calendar.confirm');
          confirmButton.classList.add('selected-confirm-button');
          confirmButton.setAttribute('tabindex', '0');
          confirmButton.setAttribute('role', 'button');
          confirmButton.onclick = () => this.abrirModalForm.emit(arg.event.start);
          console.log(this.selectedEventStart);
          container.appendChild(confirmButton);

          // Badge
          const badge = document.createElement('span');
          badge.innerText = selected;
          badge.classList.add('selected-label');
          container.appendChild(badge);
        }

        container.appendChild(time);
        container.appendChild(title);
        container.appendChild(subtitle);
        return { domNodes: [container] };
      }
    };
  }

  onConfirmar(data: { name: string; bussines: string; email: string, date: Date }) {

    this.mostrarModalConfirmacion = false;
    this.loadingService.show();
    this.calendarService.agendarReunion(data).subscribe({
      next: async (res) => {

        this.toastService.showToast({
          type: 'success',
          message: this.translate.instant('calendar.confirmation_success') + '\n',
          duration: 4000,
        })

        await this.setCalendarOptions();
        this.loadingService.hide();
      },
      error: (err) => {
        const code = err?.error?.code;
        const message = code === 'EMAIL_DUPLICATE'
          ? this.translate.instant('calendar.duplicate_email')
          : this.translate.instant('calendar.confirmation_error');

        this.toastService.showToast({
          type: 'error',
          message,
          duration: 6000,
        });
        this.loadingService.hide();
      },
    });
  }
}
