import request from 'request';
import { Paper, Talk } from '@model/paper';
import { Traceable } from '@model/traceable';
import { MobileVote } from '@model/MobileVote';

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

}