import { Traceable } from "@model/traceable";

export class Session extends Traceable {

    constructor() {
        super()
    }

    slotId: string = ''
    startTime: string = ''
    endtTime: string = ''
    trackId: string = ''
    roomId: string = ''
}
