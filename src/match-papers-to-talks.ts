import { ApiConnector } from './api/api-connector'

const user = '-'
const password = '-'

new ApiConnector('https://cfpapi.jbcnconf.com')
    .getToken(user, password, api => {

        console.log(`PAPER_ID;TALK_ID;TITLE;SPEAKER_1`)

        api.getPapers(papers => {

            let acceptedPapers = papers.filter(p => p.state == "accepted")
            console.log(`Accepted papers count: ${acceptedPapers.length}`)
            acceptedPapers.forEach(paper => {
                api.getPaperPublicState(paper._id, p => {
                    // if (!p.talkId)
                    console.log(`${paper._id};${p.talkId};"${p.title}";${p.senders[0].fullName}`)
                })
            })
        })

    })
