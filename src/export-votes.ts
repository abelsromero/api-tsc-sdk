import { ApiConnector } from './api/api-connector'
import { formatDate } from 'tough-cookie';

const user = '-'
const password = '-'

new ApiConnector('https://cfpapi.jbcnconf.com')
    .getToken(user, password, api => {

        console.log(`ID;DATE_CREATED;DATE_CREATED_TIMESTAMP;DATE_UPDATED;DATE_UPDATED_TIMESTAMP;TALK_ID;SOURCE`)
        api.getVotes(votes => {
            votes.forEach(v => {
                console.log(`${v._id},${format(v.createdDate!)},${v.createdDate},${format(v.lastUpdate!)},${v.lastUpdate},${v.talkId},${v.source}`)
            })
        })
    })

function format(date: number): string {
    return formatDate(new Date(date))
}
