const pool = require(global.__base + 'app/config/database/mysql/pool');


class Comments {


    constructor(props) {
        this._commentId = props.commentId;
        this._content = props.content;
    }


    get commentId() { return this._commentId; }
    get content() { return this._content; }

    rawData() {
        return {
            commentId: this.commentId,
            content: this.content
        };
    }

    save(callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'insert into comment set ?';
            let comment = Object.assign({}, this.rawData());
            connection.query(query, [comment], (err, results) => {
                connection.release();
                if (err) return callback(err);
                this._commentId = results.insertId;
                callback(null);
            });
        });
    }

    toJSON(callback) {
        return callback(null, this.rawData());
    }

    //Tìm kiếm cmt trong bài hát, trả về nhiều kết quả, là comment và user name của người comment tham số đầu vào là tên bài hát

    static findCmtInSong(name, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'select c.*, u.username  from song as s, comment as c, comment_song as cs, user as u where s.songId = cs.songId and cs.commentId = c.commentId and cs.userId= u.userId and s.name = ? order by cs.commentId ';
            connection.query(query, [name], (err, results) => {
                connection.release();
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let data = [];
                results[0].forEach(function(item) {
                    let props = {
                        commentId: item.commentId,
                        content: item.content
                    };
                    data.push({
                        user: item.username,
                        comment: new Comments(props)
                    });
                    props = {};
                });
                return callback(null, data);
            });
        })
    }

    // Tìm kiếm cmt trong playlist, trả về nhiều kết quả, là nội dung và username người cmt
    static findCmtInPlaylist(name, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'select c.*, u.username from playlist as p, comment as c, user as u, comment_playlist as cp where c.commentId = cp.commentId and cp.userId = u.userId and cp.playlistId = p.playlistId and p.name = ? order by commentId';
            connection.query(query, [name], (err, results) => {
                connection.release();
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let data = [];
                results[0].forEach(function(item) {
                    let props = {
                        commentId: item.commentId,
                        content: item.content
                    };
                    data.push({
                        user: item.username,
                        comment: new Comments(props)
                    });
                    props = {};
                });
                return callback(null, data);
            });
        });
    }
}

module.exports = Comments;