export namespace CalendarTypes {
  export interface CalendarItemNoId {
    readonly day: number;
    readonly nowYear: number;
    readonly nowMount: number;
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
