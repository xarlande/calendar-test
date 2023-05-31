export namespace CalendarTypes {
  export interface CalendarItem {
    day: string;
    id?: number;
    startTime?: number | null;
    stopTime?: number | null;
    currentMonth?: boolean;
  }
}

export default {};
