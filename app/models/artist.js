const pool = require(global.__base + 'app/config/database/mysql/pool');


class Artist {

    constructor(props) {
        this._artistId = props.artistId;
        this._name = props.name;
        this._type = props.type;
        this._description = props.description;
    }

    get artistId() { return this._artistId; }
    get name() { return this._name; }
    get type() { return this._type; }
    get description() { return this._description; }

    rawData() {
        return {
            artistId: this.artistId,
            name: this.name,
            type: this.type,
            description: this.description
        }
    }

    save(callback) {
        pool.getConnection((err, connection) => {
            if (err) { return callback(err); }
            let query = 'insert into artist set ?';
            let artist = Object.assign({}, this.rawData());
            connection.query(query, [artist], (err, results) => {
                connection.release();
                if (err) return callback(err);
                this._artistId = results.insertId;
                callback(null);
            });
        });
    }

    toJSON(callback) {
        return callback(null, this.rawData());
    }

    //Tìm kiếm bằng tên, chỉ có thể trả về một kết quả
    static findByName(name, callback) {
            let query = 'select * from artist where name = ?';
            pool.query(query, [name], (err, results) => {
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let data = new Artist(results[0]);
                callback(null, data);
            });

        }
        //Tìm kiếm bằng ID, trả về 1 kq
    static findById(id, callback) {
        let query = 'select * from artist where artistId = ?';
        pool.query(query, [id], (err, results) => {
            if (err) return callback(err);
            if (!results[0]) return callback(null, null);
            callback(null, new Artist(results[0]));
        });


    }

    //Tìm kiếm theo type, trả về nhiều kết quả

    static findByType(type, callback) {
        let query = 'select * from artist where type = ?';
        pool.query(query, [type], (err, results) => {
            if (err) return callback(err);
            if (!results[0]) return callback(null, null);
            let data = [];
            results.forEach(function(item) {
                data.push(new Artist(item));
            });
            callback(null, data);
        });

    }


}
module.exports = Artist;