import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class TimerService {
    constructor() {}

    calculateRemainingTime(start: string, duration: number): [boolean, number, number] {
        // get times
        let startTime: Date = new Date(start);
        let endTime: Date = new Date(startTime.getTime() + duration * 60000);
        let currentTime: Date = new Date(this.getCurrentTime());

        // calculate difference and format
        let difference: number = endTime.getTime() - currentTime.getTime();

        // check negative
        let isNegative: boolean = false;
        if (difference < 0) {
            isNegative = true;
            difference = -difference;
        }

        // get minutes and seconds
        let minutes: number = Math.floor(difference / (1000 * 60));
        let seconds: number = Math.floor((difference % (1000 * 60)) / 1000);

        return [isNegative, minutes, seconds];
    }

    getCurrentTime() {
        // get time
        let currentTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" });
        let options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };

        // format in US locale
        let formattedDate = new Intl.DateTimeFormat("en-US", options).format(new Date(currentTime));

        // filter single components
        let [datePart, timePart] = formattedDate.split(", ");
        let [month, day, year] = datePart.split("/");

        // construct current time
        let isoString = `${year}-${month}-${day}T${timePart}`;

        return isoString;
    }
}
