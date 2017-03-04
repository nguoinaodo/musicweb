const pool = require(global.__base + 'app/config/database/mysql/pool');



class Song {

    constructor(props) {
        this._songId = props.songId;
        this._name = props.name;
        this._description = props.description;
        this._dateTime = props.dateTime;
        this._type = props.type;
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
            if (err) { return callback(err); }
            let query = "insert into song set ?";
            let song = Object.assign({}, this.rawData()); //copy dữ liệu từ rawData() và object trống và trả về song

            connection.query(query, [song], (err, results) => {
                connection.release();
                if (err) return callback(err);
                this._songId = results.insertId;
                callback(null);
            });
        });

    }

    toJSON(callback) {
        return callback(null, this.rawData());
    }
    static findById(id, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'select * from song where songID= ?';
            connection.query(query, [id], (err, results) => {
                connection.release();
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let song = new Song(results[0]);
                return callback(null, song);
            });
        });
    }

    static findByName(name, callback) {
        pool.getConnection((err, connection) => {
            if (err) { return callback(err); }
            let query = 'select * from song where name= ?';
            connection.query(query, [name], (err, results) => {
                connection.release();
                if (err) return callback(err);
                if (!results[0]) {
                    return callback(null, null);
                }
                let song = new Song(results[0]);
                return callback(null, song);

            });
        });
    }
    static findbySinger(name, callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = "select song.* from song as s, artist as a, present as p where a.name= ? and a.artistId=p.artistId and p.songId=s.songId";
            connection.query(query, [name], (err, results) => {
                connection.release();
                let data = [];
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                for (var i = 0; i < results[0].length; i++) {
                    data.push(new Song(results[0][i]));
                }
                callback(null, data); //Đoán là làm thế chứ ko chắc
            });
        });
    }

    static findAllSong(callback) {
        pool.getConnection((err, connection) => {
            if (err) { return callback(err); }
            let query = 'select * from song';
            connection.query(query, [], (err, results) => {
                connection.release();
                let data = [];
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                for (var i = 0; i < results[0].length; i++) {
                    data.push(new Song(results[0][i]));
                }
                return callback(null, data); // Phần này tao ko biết khởi tạo cái đối tượng từng song nên t làm thế, có gì thì sửa cho tao
            });
        });
    }

}

module.exports = Song;