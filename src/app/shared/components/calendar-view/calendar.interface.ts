export enum DayAvailability {
  Available = 'available',
  Complete = 'complete',
  Holiday = 'holiday'
}

export enum SlotAvailability {
  Available = 'available',
  Busy = 'busy',
    Holiday = 'holiday'
}

export interface ISlot {
  title: SlotAvailability;
  start: string; // ISO 8601
  end: string; // ISO 8601
}

export interface IDiaConSlots {
  fecha: string; // ISO date string
  slots: ISlot[];
  status: DayAvailability;
  holidayName?: string;
}