import { Traceable } from "@model/traceable";

export enum VoteSource {
    mobile, tablet
}

export class MobileVote extends Traceable {

    constructor() {
        super()
    }

    talkId: string = ''
    userEmail: string = ''
    value?: number
    source?: string
}
