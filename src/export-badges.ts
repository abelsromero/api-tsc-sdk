import { ApiConnector } from './api/api-connector'
import { formatDate } from 'tough-cookie';

const user = '-'
const password = '-'

new ApiConnector('https://cfpapi.jbcnconf.com')
    .getToken(user, password, api => {
        
        console.log(`ID;DATE_CREATED;DATE_CREATED_TIMESTAMP;DATE_UPDATED;DATE_UPDATED_TIMESTAMP;SPONSOR`)
        api.getBadges(badges => {
            badges.forEach(b => {
                console.log(`${b._id},${format(b.createdDate!)},${b.createdDate},${format(b.lastUpdate!)},${b.lastUpdate};${b.sponsor!.id}`)
            })
        })
    })

function format(date: number): string {
    return formatDate(new Date(date))
}
