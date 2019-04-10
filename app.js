// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    // let msg = req.body.events[0].message.text
    reply(reply_token)
    res.sendStatus(200)
})
app.listen(port)

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {Tlgex7BNT9U5+d5/B/o1DGMFPxTJiaTCPBn+K9sxc+jOH+KjL0TV8Ax9KNboNvt42zYHmNeZef83viCVai5iqig7UxIR+bNGNUYOw3tUNJsDy534ccPdtsDn5K3RqY5P8fi9+WgQaywRoNRukNBklQdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
                type: 'text',
                text: 'Hello'
            },
            {
                type: 'text',
                text: 'How are you?'
            }
        ]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}