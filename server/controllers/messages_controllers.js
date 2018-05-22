let post = [{ id: 0, artist: '', songName: '', lyrics: '' }
    ,];
let id = 1;


module.exports = {

    postGetter: (req, res) => {
        res.status(200).send(post)

    },

    postAdder: (req, res) => {
        // console.log("i fired ma lazer")
        req.body.artist
        req.body.songName
        post.push({
            id: id,
            artist: req.body.artist,
            songName: req.body.songName,
            lyrics: req.body.lyrics
        })
        id++
        res.status(200).send(post)
        // console.log(post)
    },

    postEditer: function (req, res) {
        for (var i = 0; i < post.length; i++) {
            if (post[i].id == req.params.id) {
                post[i].artist = req.body.artist;
                post[i].songName = req.body.songName;
                post[i].lyrics = req.body.lyrics;

            }
        } res.status(200).send(post)
    },

    removePost: (req, res) => {
        console.log(req.params)
        for (var i = 0; i < post.length; i++)
            if (post[i].id === +req.params.id) {
                post.splice(i, 1)
            }
        res.status(200).send(post)
    },

    // redundant updater
    // updateLyrics: (req, res) => {
    //     console.log("lyrics be updating yall")
    //     for (var i = 0; i < post.length; i++) {
    //         if (post[i].id == req.params.id) {
    //             post[i].lyrics = req.body.lyrics;
    //         }
    //     }   res.status(200).send(post)

    // }

}
