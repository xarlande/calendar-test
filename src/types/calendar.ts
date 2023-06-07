export namespace CalendarTypes {
  export interface CalendarTime {
    id?: number;
    currentMonth?: boolean;
    day: string;
    startTime?: number;
    stopTime?: number;
  }

  export interface TimeItem {
    id: number,
    time: string,
  }
}

export default {};
