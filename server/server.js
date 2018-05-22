const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const messages = require('./controllers/messages_controllers')

        
app.use(bodyParser.json());


// base functionality
app.get('/api/getPost', messages.postGetter);
app.post('/api/addPlaylist', messages.postAdder);
app.delete('/api/deletePost/:id', messages.removePost);
app.put('/api/editPost/:id', messages.postEditer);
// redundant
// app.put('/api/updateLyrics/:id', messages.updateLyrics);




const PORT = 3030

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT )
})