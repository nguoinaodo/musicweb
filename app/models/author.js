'use strict';
const pool = require(global.__base + 'app/config/database/mysql/pool');

class Author {
    constructor(props) {
        this._authorId = props.authorId;
        this._name = props.name;
        this._description = props.description;
    }

    get authorId() { return this._authorId; }
    get name() { return this._name; }
    get description() { return this._description; }

    rawData() {
        return {
            authorId: this.authorId,
            name: this.name,
            description: this.description
        }
    }

    save(callback) {
        pool.getConnection((err, connection) => {
            if (err) return callback(err);
            let query = 'insert into author set  ?';
            let author = Object.assign({}, this.rawData());
            connection.query(query, [author], (err, results) => {
                connection.release();
                if (err) return callback(err);
                this._authorId = results.insertId;
                callback(null);
            });
        });
    }

    toJSON(callback) {
            return callback(null, this.rawData());
        }
        // Tìm kiếm bằng ID, trả về 1 kết quả

    static findById(id, callback) {
        let query = 'select * from author where authorId = ?';
        pool.query(query, [id], (err, results) => {
            if (err) return callback(err);
            if (!results[0]) return callback(null, null);
            return callback(null, new Author(results[0]));
        });

    }

    //Tìm theo tên, có thể trả về nhiều kết quả
    static findByName(name, callback) {
        let query = 'select * from author where name = ?';
        pool.query(query, [name], (err, results) => {
            if (err) return callback(err);
            if (!results[0]) return callback(null, null);
            let data = [];
            results.forEach(function(item) {
                data.push(new Author(item));
            });
            callback(null, data);
        });

    }





}

module.exports = Author;