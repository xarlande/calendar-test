export namespace CalendarTypes {
  export interface CalendarItemNoId {
    day: string;
    nowYear: number;
    nowMount: string;
  }

  export interface CalendarItem extends CalendarItemNoId {
    readonly id: number;
  }

  export interface CalendarTime extends CalendarItemNoId {
    startTime: string;
    stopTime: string;
  }
}

export default {};
