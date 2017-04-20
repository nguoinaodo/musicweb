'use strict';
const Song = require(global.__base + 'app/models/song.js');
const Author = require(global.__base + 'app/models/author.js');
const Artist = require(global.__base + 'app/models/artist.js');

let upload = (req, res) => {
    console.log(req.session.cookie);
    //Tìm kiếm tác giả trong csdl
    Author.findByName(req.body.authorName, (err, author) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        // Sai định dạng file
        if (req.file.mimetype !== 'audio/mp3' && req.file.mimetype !== 'video/mp4') {
            res.status(415).json({ errCode: 415, msg: 'Unsupported Media Type ' });
        }
        //Nếu có tác giả thì kiểm tra ca sĩ
        if (author) {
            Artist.findByName(req.body.artist, (err, artist) => {
                if (err) {
                    console.log(err);
                    return res.stus(500).json({ errCode: 500, msg: 'Internal error' });
                }
                //Nếu tồn tại ca sĩ
                if (artist) {
                    let info = {
                        name: req.body.name,
                        description: req.body.description,
                        link: req.file.path,
                        dateTime: new Date(),
                        listen: 0,
                        download: 0,
                        type: (req.file.mimetype === 'audio/mp3' ? 0 : 1),
                        userId: req.session.userId,
                        zoneId: req.body.zoneId,
                        categoryId: req.body.categoryId,
                        authorId: author[0]._authorId
                    };
                    let newSong = new Song(info);
                    newSong.save((err) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                        }
                        newSong.toJSON((err, newSongJSON) => {
                            let resData = { song: newSongJSON };
                            newSong.savePresent(resData.song.songId, req.body.artist, (err) => {
                                if (err) return res.json({ errCode: 500, msg: 'Internal error' });
                            });
                            return res.json({ errCode: 0, msg: 'Success', data: resData });

                        })
                    });
                }
                //Nếu không tồn tại ca sĩ thì báo 404, yêu cầu người dùng tạo ca sĩ 
                else return res.status(404).json({ errCode: 404, msg: ' Not found singer' });
            });
        }
        //Nếu chưa tồn tại tác giả, thì thêm tác giả vào, sau đó thêm bài hát với tác giả vừa tạo
        else {
            let authorInfo = {
                name: req.body.authorName,
                description: 'Not availble'
            };
            let newAuthor = new Author(authorInfo);
            newAuthor.save((err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                }
                newAuthor.toJSON((err, newAuthorJSON) => {
                    let resData = { author: newAuthorJSON };
                    console.log(resData);
                    let info = {
                        name: req.body.name,
                        description: req.body.description,
                        link: req.file.path,
                        listen: 0,
                        download: 0,
                        dateTime: new Date(),
                        type: (req.file.mimetype === 'audio/mp3' ? 0 : 1),
                        userId: req.body.userId,
                        zoneId: req.body.zoneId,
                        categoryId: req.body.categoryId,
                        authorId: newAuthorJSON.authorId
                    };
                    let newSong = new Song(info);
                    newSong.save((err) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                        }
                        newSong.toJSON((err, newSongJSON) => {
                            let resData = { song: newSongJSON };
                            return res.json({ errCode: 0, msg: 'Success', data: resData })

                        })
                    });

                });
            });
        }
    });


}
module.exports = upload;