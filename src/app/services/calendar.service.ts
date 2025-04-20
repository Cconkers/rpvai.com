// src/app/services/calendar.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IDiaConSlots } from '../shared/components/calendar-view/calendar.interface';


@Injectable({ providedIn: 'root' })
export class CalendarService {
  constructor(private http: HttpClient) { }

  getDiasConSlots() {
    return this.http.get<IDiaConSlots[]>(`${environment.apiCalendarUrl}/availability`);
  }

  agendarReunion(data: { name: string; bussines?: string; email: string, date: Date }) {
    // Ajustamos fecha de inicio y fin (60 min por defecto)
    const dateTimeStart = new Date(data.date);
    const dateTimeEnd = new Date(dateTimeStart.getTime() + 60 * 60000);
    return this.http.post<{ meetLink: string }>(
      `${environment.apiCalendarUrl}/book`,
      {
        name: data.name,
        email: data.email,
        dateTimeStart: dateTimeStart.toISOString(),
        dateTimeEnd: dateTimeEnd.toISOString()
      }
    );
  }
}
