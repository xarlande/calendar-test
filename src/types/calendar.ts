export namespace CalendarTypes {
  export interface CalendarItems {
    readonly id: number,
    readonly day: number,
    readonly nowYear: number,
    readonly nowMount: number
  }

  export interface CalendarState {
    currentSelectData: number;
    currentTypeShow: 'month' | 'week' | 'day';
    currentYear: number;
  }
}
