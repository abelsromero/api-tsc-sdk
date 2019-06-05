import { ApiConnector } from './api/api-connector'
import { formatDate } from 'tough-cookie';

const user = '-'
const password = '-'

new ApiConnector('https://cfpapi.jbcnconf.com')
    .getToken(user, password, api => {

        console.log(`ID;DATE_CREATED;DATE_CREATED_TIMESTAMP;DATE_UPDATED;DATE_UPDATED_TIMESTAMP;TALK_ID`)
        api.getFavs(favs => {
            favs.forEach(f => {
                console.log(`${f._id},${format(f.createdDate!)},${f.createdDate},${format(f.lastUpdate!)},${f.lastUpdate},${f.talkId}`)
            })
        })
    })

function format(date: number): string {
    return formatDate(new Date(date))
}
