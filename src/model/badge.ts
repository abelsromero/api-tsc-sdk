import { Traceable } from './traceable';

export enum Gender {
    M, F
}

export class Attendee {
    name: string = ''
    email: string = ''
    language: string = ''
    age?: number
    gender?: Gender

    company: string = ''
    jobTitle: string = ''
    city: string = ''
    country: string = ''
    programmingLanguages: string = ''
}

export class SponsorImage {
    src: string = ''
    alt: string = ''
}

export class SponsorLevel {
    priority?: number
    name: string = ''
}

// NOTE: Sponsor does not actually implement Traceable
// We do that just to use `AbstractCrudService`
export class Sponsor extends Traceable {
    id: string = ''
    name: string = ''
    href: string = ''
    image?: SponsorImage
    level?: SponsorLevel
    code: string = ''
}

export class Badge extends Traceable {
    constructor() {
        super()
    }
    attendee?: Attendee
    sponsor?: Sponsor
    details?: string = ''
}
