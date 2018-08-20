export class Note {

    id: number;
    title: string;
    text: string;

    constructor() {
        this.id = 0,
        this.title = '',
        // tslint:disable-next-line:semicolon
        this.text = ''
    }
}
