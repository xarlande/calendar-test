export namespace CalendarTypes {
  export interface CalendarItem {
    day: string;
    startTime?: number;
    stopTime?: number;
  }

  export interface CalendarTime extends CalendarItem {
    id?: number;
    currentMonth: boolean;
  }
}

export default {};
