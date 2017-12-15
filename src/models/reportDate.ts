export class ReportDate {
    id: number;
    report_start: string;
    report_end: string;
    report_year: number;
    report_semester: number;

    constructor() {
        this.report_start = '',
        this.report_end = ''
    }
}