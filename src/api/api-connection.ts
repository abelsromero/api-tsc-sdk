import request from 'request';
import { Paper, Talk } from '@model/paper';
import { Traceable } from '@model/traceable';
import { MobileVote, VoteSource } from '@model/mobileVote';
import { Session } from 'inspector';
import { Badge } from '@model/badge';
import { Favourited } from '@model/favourited';

export class ApiConnection {

    private readonly url: string
    private readonly token: string

    constructor(url: string, token: string) {
        this.url = url
        this.token = token
    }

    getPapers(cb: (papers: Paper[]) => void): any {
        this.search('api/paper', cb)
    }

    getPaperPublicState(id: string, cb: (paper: Paper) => void) {
        request.get({
            url: `${this.url}/public/api/paper/state/${id}`
        }
            , (error, response, body) => {
                return cb(JSON.parse(body).data.instance)
            });
    }


    getTalks(cb: (talks: Talk[]) => void): any {
        this.search('api/talk', cb)
    }

    private search<T extends Traceable>(resource: string, cb: (result: T[]) => void) {
        request.post({
            headers: {
                "Authorization": `Bearer ${this.token}`,
            },
            url: `${this.url}/${resource}/search`,
            json: {
                term: null,
                sort: "createdDate",
                asc: false,
                filters: [],
                page: 0,
                size: 500
            }
        }
            , (error, response, body) => {
                // console.log(`Found: ${body.data}`)
                cb(body.data.items)
            });
    }

    getSessions(cb: (sessions: Session[]) => void) {
        request.get({
            headers: {
                "Authorization": `Bearer ${this.token}`,
            },
            url: `${this.url}/api/sessions`
        }
            , (error, response, body) => {
                return cb(JSON.parse(body).data.items)
            });
    }

    getVotes(cb: (votes: MobileVote[]) => void) {
        request.get({
            headers: {
                "Authorization": `Bearer ${this.token}`,
            },
            url: `${this.url}/api/attendees/votes/`
        }
            , (error, response, body) => {
                return cb(JSON.parse(body).data.items)
            });
    }

    updateVoteSource(talk: string, email: string, newSource: string) {
        request.put({
            headers: {
                "Authorization": `Bearer ${this.token}`,
            },
            url: `${this.url}/api/attendees/votes`,
            json: {
                talkId: talk,
                userEmail: email,
                source: newSource
            }
        }
            , (error, response, body) => {
                console.log(body)
            });
    }

    createVote(vote: { index: number; talkId: string; userEmail: string; value: number; source: string; },
        cb: (id: string) => void) {
        request.put({
            headers: {
                "Authorization": `Bearer ${this.token}`,
            },
            url: `${this.url}/api/attendees/votes`,
            json: vote
        }
            , (error, response, body) => {
                console.log(body)
                console.log(body.data._id)
                return cb(body.data._id)
            });
    }

    getBadges(cb: (badges: Badge[]) => void) {
        request.get({
            headers: {
                "Authorization": `Bearer ${this.token}`,
            },
            url: `${this.url}/api/badges/`
        }
            , (error, response, body) => {
                return cb(JSON.parse(body).data.items)
            });
    }

    getFavs(cb: (favs: Favourited[]) => void) {
        request.get({
            headers: {
                "Authorization": `Bearer ${this.token}`,
            },
            url: `${this.url}/api/talks/favourites/`
        }
            , (error, response, body) => {
                return cb(JSON.parse(body).data.items)
            });
    }

}