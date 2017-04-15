const pool = require(global.__base + 'app/config/database/mysql/pool');


class Comments {

    constructor(props) {
        this._userId = props.userId;
        this._contents = props.contents;
        this._songId = props.songId;
        this._dateTime = props.dateTime;
    }

    get userId() { return this._userId; }
    get commentId() { return this._commentId; }
    get contents() { return this._contents; }
    get songId() { return this._songId; }
    get dateTime() { return this._dateTime; }
    rawData() {
        return {
            userId: this.userId,
            songId: this.songId,
            contents: this.contents,
            dateTime: this.dateTime
        };
    }

    save(callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'insert into comment_song set ?';
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

    //Tìm kiếm cmt trong bài hát, trả về nhiều kết quả, là comment và user name của người comment tham số đầu vào là tên bài hát

    static findCmtSong(songId, callback) {
            let query = 'select u.username, cs.* from comment_song as cs, user as u where cs.userId = u.userId and cs.songId = ? order by cs.dateTime';
            pool.query(query, [songId], (err, results) => {
                if (err) return callback(err);
                if (!results[0]) return callback(null);
                else return callback(null, results);
            });
        }
        //Xóa cmt bằng ID , chỉ user cmt mới có thể xóa
    static rmCmt(cmtId, userId, callback) {
        let query = 'delete from comment_song where commentId = ? and userId = ?';
        pool.query(query, [cmtId, userId], (err, result) => {
            console.log(result);
            if (err) return callback(err);
            else return callback(null, result);
        });
    }
}

module.exports = Comments;