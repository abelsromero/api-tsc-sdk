import { Traceable } from "@model/traceable";

export class MobileVote extends Traceable {

    constructor() {
        super()
    }

    talkId: string = ''
    value?: number

}
