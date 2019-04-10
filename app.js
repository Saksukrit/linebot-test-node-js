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
    let msg = req.body.events[0].message.text
    let acdata = req.body.events[0].postback.data.action
    // start action with events 
    if (msg == "copy") {
        copy(reply_token, msg)
    } else if (acdata != null) {
        copy(reply_token, "msg")
    }
    reply(reply_token)
    res.sendStatus(200)
})
app.listen(port)
let ChannelAccessToken = 'HUyxwPA7qS0Vww6fFKa+Va3MRXU7J5PaxZbWf3coHFcWR5gMG7IDYiJWdmiqs5vg2zYHmNeZef83viCVai5iqig7UxIR+bNGNUYOw3tUNJuttavXgJK3P5Db1wEMQguE+AJOoHNO209T5wwZl9VVMwdB04t89/1O/w1cDnyilFU='

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {' + ChannelAccessToken + '}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
                type: 'text',
                text: 'Hello'
            },
            {
                "type": "template",
                "altText": "This is a buttons template",
                "template": {
                    "type": "buttons",
                    "thumbnailImageUrl": "https://software.thaiware.com/upload_misc/software/2018_03/thumbnails/13783_180320105145r1.jpg",
                    "imageAspectRatio": "rectangle",
                    "imageSize": "cover",
                    "imageBackgroundColor": "#FFFFFF",
                    "title": "Menu",
                    "text": "Please select",
                    "defaultAction": {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "https://software.thaiware.com"
                    },
                    "actions": [{
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=123"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=123"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "https://software.thaiware.com"
                        }
                    ]
                }
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

function copy(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {' + ChannelAccessToken + '}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}