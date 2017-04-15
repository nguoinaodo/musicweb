const pool = require(global.__base + 'app/config/database/mysql/pool');


class Comments {

    constructor(props) {
        this._userId = props.userId;
        this._contents = props.contents;
        this._playlistId = props.playlistId;
        this._dateTime = props.dateTime;
    }

    get userId() { return this._userId; }
    get commentId() { return this._commentId; }
    get contents() { return this._contents; }
    get playlistId() { return this._playlistId; }
    get dateTime() { return this._dateTime; }
    rawData() {
        return {
            userId: this.userId,
            playlistId: this.playlistId,
            contents: this.contents,
            dateTime: this.dateTime
        };
    }

    save(callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'insert into comment_playlist set ?';
            let comment = Object.assign({}, this.rawData());
            connection.query(query, [comment], (err, results) => {
                connection.release();
                if (err) return callback(err);
                callback(null);
            });
        });
    }

    toJSON(callback) {
        return callback(null, this.rawData());
    }

    // Tìm kiếm cmt trong playlist, trả về nhiều kết quả, là nội dung và username người cmt
    static findCmtPlaylist(playlistId, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'select cp.*, u.username from comment_playlist as cp, user as u where  u.userId = cp.userId and cp.playlistId = ? order by cp.dateTime';
            connection.query(query, [playlistId], (err, results) => {
                connection.release();
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                return callback(null, results);
            });
        });
    }
}

module.exports = Comments;