const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

// Post object example:

/*
post = {
    'jd13124': {
        id: 'jd13124',
        title: 'random title',
        comments: [
            {id: 'jklio2, content: 'I hate apple juidce'},
            {id: '213io4, content: 'orange goes better'}
        ]
    }
}
*/

app.get('/posts', (req, res)=>{
    res.send(posts)
})

app.post('/events', (req, res)=>{
    const {type, data} = req.body
    
    if(type === 'PostCreated'){
        const {id, title} = data
        posts[id] = {id, title, comments: []}
    }
    if(type === 'CommentCreated'){
        const {id, content, postId} = data
        const post = posts[postId]
        post.comments.push({id, content})
    }
    console.log(posts)
    res.send({})
})

app.listen(4002, ()=>{
    console.log('Listening on 4002')
})