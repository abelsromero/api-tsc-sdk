import { ApiConnector } from './api/api-connector'
import { Sender } from '@model/paper';

const user = '-'
const password = '-'

new ApiConnector('https://cfpapi.jbcnconf.com')
    .getToken(user, password, api => {

        console.log(`NAME;EMAIL;PAPER_TITLE;AVG_VOTE`)

        api.getTalks(talks => {

            let acceptedSpeakers = new Map<String, Sender>()
            let acceptedSpeakersMails = new Array<String>()

            talks.forEach(t => {
                t.speakers.forEach(speaker => {
                    acceptedSpeakers.set(speaker.email, speaker)
                    acceptedSpeakersMails.push(speaker.email)
                });
            })

            api.getPapers(papers => {
                papers.forEach(p => {
                    let notAcceptedSpeakers = new Array<Sender>()
                    p.senders.forEach(s => {
                        if (!acceptedSpeakersMails.includes(s.email)) {
                            console.log(`${s.fullName};${s.email};"${p.title}";${p.averageVote}`)
                            notAcceptedSpeakers.push(s)
                        }
                    })
                    /*
                    notAcceptedSpeakers
                        .forEach(sender => {
                            console.log(`${sender.fullName};${sender.email};"${paper.title}";${paper.averageVote}`)
                        })
                    */
                })
            })
        })
    })
