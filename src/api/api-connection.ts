import request from 'request';
import { Paper, Talk } from '@model/paper';
import { Traceable } from '@model/traceable';

export class ApiConnection {

    private readonly url: string
    private readonly token: string

    constructor(url: string, token: string) {
        this.url = url
        this.token = token
    }

    getPapers(cb: (papers: Paper[]) => void): any {
        this.search('paper', cb)
    }

    getTalks(cb: (talks: Talk[]) => void): any {
        this.search('talk', cb)
    }

    private search<T extends Traceable> (resource:string, cb: (result: T[]) => void) {
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

}