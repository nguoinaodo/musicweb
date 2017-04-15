const pool = require(global.__base + 'app/config/database/mysql/pool');

class Song {

    constructor(props) {
        this._songId = props.songId;
        this._name = props.name;
        this._description = props.description;
        this._dateTime = props.dateTime;
        this._type = props.type;
        this._link = props.link;
        this._listen = props.listen;
        this._download = props.download;
        this._userId = props.userId;
        this._zoneId = props.zoneId;
        this._categoryId = props.categoryId;
        this._authorId = props.authorId;
    }

    get songId() { return this._songId; }
    get name() { return this._name; }
    get description() { return this._description; }
    get dateTime() { return this._dateTime; }
    get type() { return this._type; }
    get link() { return this._link; }
    get listen() { return this._listen; }
    get download() { return this._download; }
    get userId() { return this._userId; }
    get zoneId() { return this._zoneId; }
    get categoryId() { return this._categoryId; }
    get authorId() { return this._authorId; }

    rawData() {
        return {
            songId: this.songId,
            name: this.name,
            description: this.description,
            dateTime: this.dateTime,
            link: this.link,
            type: this.type,
            listen: this.listen,
            download: this.download,
            userId: this.userId,
            zoneId: this.zoneId,
            categoryId: this.categoryId,
            authorId: this.authorId
        }
    }
    save(callback) {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            console.log(this.rawData());
            let query = "INSERT INTO song SET ?";
            connection.query(query, [this.rawData()], (err, results) => {
                connection.release();
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                this._songId = results.insertId;
                callback(null);

            });
        });

    }
    savePresent(songId, artistId, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let info = {
                songId: songId,
                artistId: artistId
            };
            let query = 'insert into present set ?';
            connection.query(query, [info], (err, results) => {
                connection.release();
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                callback(null);

            });

        });


    }

    toJSON(callback) {
        return callback(null, this.rawData());
    }

    //Tìm kiếm bằng ID, chỉ trả về một kết quả
    static findById(id, callback) {
        let query = 'select * from song where songId= ?';
        pool.query(query, [id], (err, results) => {
            if (err) return callback(err);
            if (!results[0]) return callback(null, null);
            let song = new Song(results[0]);
            return callback(null, song);
        });

    }

    // Tìm kiếm theo tên, có thể trả về nhiều kq
    static findByName(name, callback) {
            let query = 'select * from song where name = ?';
            pool.query(query, [name], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                if (!results[0]) {
                    return callback(null, null);
                }
                let data = [];
                results.forEach(function(item) {
                    data.push(new Song(item));
                });
                return callback(null, data);

            });

        }
        //Tìm kiếm theo ca sĩ, có thể trả về nhiều kq
    static findBySinger(name, callback) {
            let query = "select s.* from song as s, artist as a, present as p where a.name= ? and a.artistId = p.artistId and p.songId = s.songId";
            pool.query(query, [name], (err, results) => {
                let data = [];
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                results.forEach(function(item) {
                    data.push(new Song(item));
                });
                callback(null, data);
            });

        }
        //Tìm kiếm theo tác giả, có thể trả về nhiều kết quả
    static findByAuthor(name, callback) {
            let query = 'select s.* from song as s, author as au where au.authorId = s.authorId and au.name = ? ';
            pool.query(query, [name], (err, results) => {
                let data = [];
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                results.forEach(function(item) {
                    data.push(new Song(item));
                });
                callback(null, data);
            });

        }
        //Tìm bài hát theo zone, có thể trả về nhiều kết quả
    static findByZone(name, callback) {
            let query = 'select s.* from song as s, zone as z where z.zoneId = s.zoneId and z.name = ?';
            pool.query(query, [name], (err, results) => {
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let data = [];
                results.forEach(function(item) {
                    data.push(new Song(item));
                });
                callback(null, data);
            });

        }
        //Tìm kiếm bằng category, trả về nhiều kết quả
    static findByCategory(name, callback) {
        let query = 'select s.* from song as s, category as c where c.name = ? and s.categoryId = c.categoryId';
        pool.query(query, [name], (err, results) => {
            if (err) return callback(err);
            if (!results[0]) return callback(null, null);
            let data = [];
            results.forEach(function(item) {
                data.push(new Song(item));
            });
            callback(null, data);
        });

    }
    static findByType(type, callback) {
            let code;
            if (type === 'video/mp4') code = 1;
            else code = 0;
            let query = 'select * from song where type = ?';
            pool.query(query, [code], (err, results) => {
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let data = [];
                results.forEach(function(item) {
                    data.push(new Song(item));
                });
                callback(null, data);
            });




        }
        //Tìm kiếm thông tin trình diễn
    static findPresent(name, callback) {
            let query = 'select s.*, a.name as perform from song as s, artist as a, present as p where s.name = ? and s.songId = p.songId and p.artistId = a.artistId';
            pool.query(query, [name], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                }
                return callback(null, results);
            });

        }
        //Tìm kiếm bài hát trong playlist (trả về nhiều kết quả)
    static findSongPlaylist(playlistName, callback) {
            let query = 'select s.* from song as s, song_in_playlist as sp, playlist as p where p.name = ? and p.playlistId = sp.playlistId and sp.songId = s.songId';
            pool.query(query, [playlistName], (err, results) => {
                if (err) return callback(err);
                if (!results[0]) return callback(null);
                let data = [];
                results.forEach(function(item) {
                    data.push(new Song(item));
                });
                return callback(null, data);
            });


        }
        //Xóa song (quyền admin)
    static deleteSongAdmin(songId, callback) {
        let query = "delete from song where songId = ?";
        pool.query(query, [songId], (err, results) => {
            if (err) return callback(err);
            else return callback(null, results);
        });

    }

    //Xóa song bằng ID
    static deleteSong(userId, songId, callback) {
        let query = "delete from song where userId = ? and songId = ? ";
        pool.query(query, [userId, songId], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            return callback(null, results);
        });

    }

    //Cập nhật lượt nghe của bài hát
    static updateListening(songId, callback) {
            let query = 'update song set listen = listen + 1 where songId = ?';
            pool.query(query, [songId], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    callback(null);
                }
            });

        }
        //Cập nhật lượt tải của bài hát
    static updateDownload(songId, callback) {
            let query = 'update song set download = download+ 1 where songId = ?';
            pool.query(query, [songId], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    callback(null);
                }
            });

        }
        // Bảng xếp hạng
    static getRankTable(type, callback) {
            let query = "select * from song where type = ? order by listen DESC";
            pool.query(query, [type], (err, results) => {
                if (err) return callback(err);
                let data = [];
                results.forEach(function(item) {
                    data.push(new Song(item));
                });
                callback(null, data);
            });
        }
        //Kiểm tra file đã tồn tại chưa:
    static findFile(path, callback) {
        let query = 'select * from song where link = ?';
        pool.query(query, [path], (err, results) => {
            if (err) return callback(err);
            if (!results[0]) return callback(null, null);
            return callback(null, new Song(results[0]));
        });
    }
    static find(queryObj, callback) {
        let tableList = ['artist', 'present', 'author', 'song'];
        let jsonConditions = ['song.songId = present.songId', 'present.artistId = artist.artistId', 'song.authorId = author.authorId'];
        let queryList = [];
        let valueList = [];
        if (queryObj.songId) {
            queryList.push('song.songId = ?');
            valueList.push(queryObj.songId);
        }
        if (queryObj.songName) {
            queryList.push('song.name LIKE ?');
            valueList.push('%' + queryObj.songName + '%');
        }
        if (queryObj.userId) {
            tableList.push('user');
            jsonConditions.push('song.userId = user.userid');
            queryList.push('user.userid = ?');
            valueList.push(queryObj.userId);
        }
        if (queryObj.zoneName) {
            tableList.push('zone');
            jsonConditions.push('song.zoneId = zone.zoneId');
            queryList.push('zone.name = ?');
            valueList.push(queryObj.zoneName);
        }
        if (queryObj.categoryName) {
            tableList.push('category');
            jsonConditions.push('song.categoryId = category.categoryId');
            queryList.push('category.name = ?');
            valueList.push(queryObj.categoryName);
        }
        if (queryObj.authorName) {
            tableList.push('author');
            jsonConditions.push('song.authorId = author.authorId');
            queryList.push('author.name = ?');
            valueList.push(queryObj.authorName);
        }
        let orderBy = 'songId';
        let sort = ' DESC';
        switch (queryObj.orderBy) {
            case 'songId':
                orderBy = 'song.songId';
                break;
            case 'listen':
                orderBy = 'song.listen';
                break;
            case 'download':
                orderBy = 'song.download';
                break;
            case 'name':
                orderBy = 'song.name';
                break;
            default:
                orderBy = 'song.songId';
        }
        if (queryObj.sort === 'ASC') {
            sort = ' ASC';
        }

        let query = 'SELECT *, artist.name as singer, author.name as author FROM ' + tableList.join(', ') + ' WHERE ' + jsonConditions.join(' AND ');
        if (queryList.length === 0) {
            query += ' ORDER BY' + orderBy + sort;
        } else {
            query += ' AND ' + queryList.join(' AND') + ' ORDER BY ' + orderBy + sort;
        }
        console.log(query);
        console.log(valueList);
        pool.query(query, valueList, (err, results) => {
            console.log(results);
            if (err) return callback(err);
            if (!results[0]) return callback(null, []);
            return callback(null, results);
        });




    }
}

module.exports = Song;