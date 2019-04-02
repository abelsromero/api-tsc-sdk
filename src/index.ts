import { ApiConnector } from './api/api-connector'
import { Sender } from '@model/paper';

const user = '-'
const password = '-'

new ApiConnector('https://cfpapi.jbcnconf.com')
    .getToken(user, password, api => {

        console.log(`NAME;EMAIL;PAPER_TITLE;AVG_VOTE;VOTES`)
        api.getTalks(talks => {

            let acceptedSpeakers = new Array<Sender>()

            talks.forEach(talk => {
                talk.speakers.forEach(speaker => {
                    acceptedSpeakers.push(speaker)
                });
            })

            api.getPapers(papers => {
                let acceptedEmails = acceptedSpeakers.map(s => s.email.trim()).sort()
                let acceptedNames = acceptedSpeakers.map(s => s.fullName.trim()).sort()
                let notAcceptedSpeakers = new Map<String, Sender>()
                papers.forEach(paper => {

                    paper.senders.forEach(s => {
                        // beware some speakers registered with different emails
                        if (!acceptedEmails.includes(s.email.trim()) && !acceptedNames.includes(s.fullName.trim())) {
                            notAcceptedSpeakers.set(s.fullName.trim(), s)
                            console.log(`${s.fullName.trim()};${s.email.trim()};"${paper.title}";${paper.averageVote};${paper.votes ? paper.votes.length : 0}`)
                        }
                    })
                    /*
                    Array.from(notAcceptedSpeakers.values())
                        .forEach(sender => {
                            console.log(`${sender.fullName.trim()};${sender.email.trim()};"${paper.title}";${paper.averageVote};${paper.votes ? paper.votes.length : 0}`)
                        })
                    */
                })
            })
        })
    })
