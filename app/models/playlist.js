const pool = require(global.__base + 'app/config/database/mysql/pool');

class Playlist {
    constructor(props) {
        this._playlistId = props.playlistId;
        this._name = props.name;
        this._description = props.description;
        this._type = props.type;
        this._isVerify = props.isVerify;
        this._dateTime = props.dateTime;
        this._userId = props.userId;
    }
    get playlistId() { return this._playlistId; }
    get name() { return this._name; }
    get description() { return this._description; }
    get type() { return this._type; }
    get isVerify() { return this._isVerify; }
    get dateTime() { return this._dateTime; }
    get userId() { return this._userId; }


    rawData() {
        return {
            playlistId: this.playlistId,
            name: this.name,
            description: this.description,
            type: this.type,
            isVerify: this.isVerify,
            dateTime: this.dateTime,
            userId: this.userId
        }
    }

    save(callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'insert into playlist set ?';
            let playlist = Object.assign({}, this.rawData());
            connection.query(query, [playlist], (err, results) => {
                connection.release();
                if (err) return callback(err);
                this._playlistId = results.insertId;
                callback(null);
            });
        });
    }
    toJSON(callback) {
        return callback(null, this.rawData());
    }

    // Chắc ko thằng nào tìm đc playlist bằng ID đâu nên làm tìm bằng tên thôi

    //Tìm theo tên trả về nhiều kết quả

    static findByName(name, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'select * from playlist where name = ?';
            connection.query(query, [name], (err, results) => {
                connection.release();
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let data = [];
                results.forEach(function(item) {
                    data.push(new Playlist(item));
                });
                callback(null, data);
            });
        });
    }

    // Tìm kiếm bằng type, có thể trả về nhiều kết quả
    static findByType(type, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'select * from playlist where type = ?';
            connection.query(query, [type], (err, resutls) => {
                connection.release();
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let data = [];
                results.forEach(function(item) {
                    data.push(new Playlist(item));
                });
                callback(null, data);
            });
        });
    }

    //Tìm kiếm bằng ID người dùng sở hữu playlist, trả về nhiều kết quả

    static findByUserId(id, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'select * from playlist where userId = ?';
            connection.query(query, [id], (err, results) => {
                connection.release();
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let data = [];
                results.forEach(function(item) {
                    data.push(new Playlist(item));
                });
                callback(null, data);
            });
        });
    }

    static addSong(songId, playlistName, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = "select * from playlist where name = ?";
            connection.query(query, [playlistName], (err, results) => {
                if (err) return callback(err);
                else {
                    console.log(results);
                    let info = {
                        songId: songId,
                        playlistId: results[0].playlistId,
                        order: 1
                    };
                    let query = "insert into song_in_playlist set ?";
                    connection.query(query, [info], (err, results) => {
                        connection.release();
                        if (err) {
                            return callback(err);
                        }
                        callback(null);
                    });

                }
            });
        });

    }
    static removeSong(songId, playlistId, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'select * from song_in_playlist where songId = ? and playlistId = ?';
            connection.query(query, [songId, playlistId], (err, results) => {
                if (err) return callback(err);
                if (results) {
                    let query = "delete from song_in_playlist where songId = ? and playlistId = ?";
                    connection.query(query, [songId, playlistId], (err, results) => {
                        console.log(results);
                        connection.release();
                        if (err) return callback(err);
                        return callback(null, results);
                    });
                } else return callback(null);
            });

        });
    }
    static deletePlaylist(playlistId, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'delete from playlist where playlistId = ?';
            connection.query(query, [playlistId], (err, results) => {
                connection.release();
                if (err) return callback(err);
                else return callback(null, results);
            });
        });
    }


}
module.exports = Playlist;