import { Traceable } from './traceable';

export class Favourited extends Traceable {
    constructor() {
        super()
    }

    talkId: string = ''
    user: string = ''
    talkFavs!: number
}
