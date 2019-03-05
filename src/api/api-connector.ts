import request from 'request';
import { ApiConnection } from './api-connection';

export class ApiConnector {

    private readonly url: string;

    constructor(url: string) {
        this.url = url
    }

    getToken(user: string, password: string, cb: (con: ApiConnection) => any) {
        request.post({
            headers: {
            },
            url: `${this.url}/login`,
            json: { username: user, password: password }
        }
            , (error, response, body) => {
                if (response.statusCode == 200) {
                    cb(new ApiConnection(`${this.url}/api`, body.data.token))
                } else {
                    console.log("[ERROR]] " + body.message)
                }
            });

    }

}