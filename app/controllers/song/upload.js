'use strict';
const Song = require(global.__base + 'app/models/song.js');
const Author = require(global.__base + 'app/models/author.js');
const Artist = require(global.__base + 'app/models/artist.js');

let upload = (req, res) => {
    console.log(req.session.cookie);
    // Check file trong cơ sở dữ liệu:
    Song.findFile(req.file.path, (err, song) => {
        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        if (song) return res.status(400).json({ errCode: -2, msg: 'File already exist' });
        else {
            //Tìm kiếm tác giả trong database
            Author.findByName(req.body.author, (err, author) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                }
                // Sai định dạng file
                if (req.file.mimetype !== 'audio/mp3' && req.file.mimetype !== 'video/mp4') {
                    res.status(415).json({ errCode: -7, msg: 'Unsupported Media Type ' });
                }
                //Nếu có tác giả thì kiểm tra ca sĩ
                if (author) {
                    Artist.findByName(req.body.artist, (err, artist) => {
                        if (err) {
                            console.log(err);
                            return res.stus(500).json({ errCode: 500, msg: 'Internal error' });
                        }
                        //Có tác giả - có ca sĩ
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
                                userId: req.user.userId,
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
                                    newSong.savePresent(newSongJSON.songId, artist.artistId, (err) => {
                                        if (err) return res.json({ errCode: 500, msg: 'Internal error' });
                                    });
                                    return res.json({ errCode: 0, msg: 'Success', data: resData });

                                })
                            });
                        }
                        //Có tác giả - không ca sĩ
                        //Nếu không tồn tại ca sĩ tạo ca sĩ mới với tham số mặc định :
                        else {
                            let singerInfo = {
                                name: req.body.artist,
                                type: 0,
                                description: 'Not available'
                            }
                            let newArtist = new Artist(singerInfo);
                            newArtist.save((err) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                                }
                                newArtist.toJSON((err, newArtistJSON) => {
                                    let resData = { artist: newArtistJSON };
                                    let info = {
                                        name: req.body.name,
                                        description: req.body.description,
                                        link: req.file.path,
                                        listen: 0,
                                        download: 0,
                                        dateTime: new Date(),
                                        type: (req.file.mimetype === 'audio/mp3' ? 0 : 1),
                                        userId: req.user.userId,
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
                                            newSong.savePresent(newSongJSON.songId, newArtistJSON.artistId, (err) => {
                                                if (err) return res.json({ errCode: 500, msg: 'Internal error' });
                                            });
                                            return res.json({ errCode: 0, msg: 'Success', data: resData })

                                        })
                                    });

                                })
                            });

                        }
                    });
                }
                //Nếu chưa tồn tại tác giả, thì thêm tác giả vào, sau đó thêm bài hát với tác giả vừa tạo
                else {
                    Artist.findByName(req.body.artist, (err, artist) => {
                        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });

                        if (artist) { //Có ca sĩ - không tác giả
                            //Tạo tác giả mới với tham số mặc định 
                            let authorInfo = {
                                name: req.body.author,
                                description: 'Not available'
                            };
                            let newAuthor = new Author(authorInfo);
                            newAuthor.save((err) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                                }
                                newAuthor.toJSON((err, newAuthorJSON) => {
                                    let info = {
                                        name: req.body.name,
                                        description: req.body.description,
                                        link: req.file.path,
                                        listen: 0,
                                        download: 0,
                                        dateTime: new Date(),
                                        type: (req.file.mimetype === 'audio/mp3' ? 0 : 1),
                                        userId: req.user.userId,
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
                                            newSong.savePresent(newSongJSON.songId, artist.artistId, (err) => {
                                                if (err) return res.json({ errCode: 500, msg: 'Internal error' });
                                            });
                                            return res.json({ errCode: 0, msg: 'Success', data: resData })

                                        })
                                    });

                                });
                            });



                        } else {
                            //Không ca sĩ - Không tác giả
                            //Tạo ca sĩ trước
                            let singerInfo = {
                                name: req.body.artist,
                                type: 0,
                                description: 'Not available'
                            }
                            let newArtist = new Artist(singerInfo);
                            newArtist.save((err) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                                }
                                newArtist.toJSON((err, newArtistJSON) => {
                                    let resData = { artist: newArtistJSON };
                                    let authorInfo = {
                                        name: req.body.author,
                                        description: 'Not availble'
                                    };
                                    let newAuthor = new Author(authorInfo);
                                    newAuthor.save((err) => {
                                        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                                        newAuthor.toJSON((err, newAuthorJSON) => {
                                            if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                                            let info = {
                                                name: req.body.name,
                                                description: req.body.description,
                                                link: req.file.path,
                                                listen: 0,
                                                download: 0,
                                                dateTime: new Date(),
                                                type: (req.file.mimetype === 'audio/mp3' ? 0 : 1),
                                                userId: req.user.userId,
                                                zoneId: req.body.zoneId,
                                                categoryId: req.body.categoryId,
                                                authorId: newAuthorJSON.authorId
                                            };
                                            let newSong = new Song(info);
                                            newSong.save((err) => {
                                                if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                                                newSong.toJSON((err, newSongJSON) => {
                                                    if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                                                    newSong.savePresent(newSongJSON.songId, newArtistJSON.artistId, (err) => {
                                                        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                                                        return res.status(200).json({ errCode: 0, msg: 'Success', data: { song: newSongJSON } });
                                                    });
                                                });
                                            });

                                        });
                                    });

                                });
                            });

                        }








                    });




                }








            });


        }

    });



}
module.exports = upload;