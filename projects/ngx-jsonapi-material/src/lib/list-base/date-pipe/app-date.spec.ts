import { DatePipe } from "@angular/common";
import { AppDatePipe, AppDateTimePipe } from "./app-date.pipe";

describe('AppDatePipe', (): void => {
    const pipe: DatePipe = new AppDatePipe('en-US');
    const pipeWithTime: DatePipe = new AppDateTimePipe('en-US')
  
    it('Should transforms 2021-06-11 16:00:00 to 11/06/2021', (): void => {
      expect(pipe.transform('2021-06-11 16:00:00')).toBe('11/06/2021');
    });

    it('Should transforms 2021-06-11 16:00:00 to 11/06/2021 16:00:00', (): void => {
      expect(pipeWithTime.transform('2021-06-11 16:00:00')).toBe('11/06/2021 16:00:00');
    });

  });