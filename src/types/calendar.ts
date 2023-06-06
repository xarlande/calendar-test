export namespace CalendarTypes {
  export interface CalendarTime {
    id?: number;
    currentMonth?: boolean;
    day: string;
    startTime?: number;
    stopTime?: number;
  }

  export interface TimeItem {
    currentTime?: boolean,
    id: number,
    time: string,
  }
}

export default {};
