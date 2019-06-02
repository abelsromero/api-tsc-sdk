import { Traceable } from "@model/traceable";

export class Paper extends Traceable {

    constructor() {
        super()
    }

    edition?: string;
    senders!: Sender[];
    abstract?: string;
    comments?: string;
    title!: string;
    state?: string;
    level?: string;
    type?: string;
    averageVote?: never;
    totalVote?: number;
    votesCount?: number;
    preferenceDay?: string;
    tags?: string[];
    votes?: PaperVote[];
    travelCost?: boolean;
    sponsor?: boolean;
    // only used for public/api/paper/state
    talkId?: string;
}

export class PaperVote {
    userId?: string;
    username?: string;
    vote?: number;
    date?: Date;
}

export class Sender {
    fullName!: string;
    email!: string;
    picture?: string;
    jobTitle?: string;
    company?: string;
    biography?: string;
    twiter?: string;
    web?: string;
    linkedin?: string;
    tshirtSize?: boolean;
    travelCost?: boolean;
    attendeesParty?: boolean;
    speakersParty?: boolean;
}

export class Talk extends Paper {
    // copy of averageVote
    totalVote!: number;
    speakers!: Sender[];
}