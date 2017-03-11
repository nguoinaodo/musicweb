const pool = require(global.__base + 'app/config/database/mysql/pool');

class Category {

    constructor(props) {
        this._categoryId = props.categoryId;
        this._name = props.name;
    }

    get categoryId() { return this._categoryId; }
    get name() { return this._name; }

    rawData() {
        return {
            categoryId: this.categoryId,
            name: this.name
        };
    }

    save(callback) {
        pool.getConnection((err, connection) => {
            if (err) { return callback(err); }
            let query = 'insert into category set ?';
            connection.query(query, [this.rawData()], (err, results) => {
                connection.release();
                if (err) { return callback(err); }
                this._categoryId = results.insertId;
                callback(null);
            });
        });
    }
    toJSON(callback) {
            return callback(null, this.rawData());
        }
        // Tìm kiếm theo tên, trả về nhiều kết quả
    static findbyName(name, callback) {
        pool.getConnection((err, connection) => {
            if (err) { return callback(err); }
            let query = 'select * from category where name = ?';
            connection.query(query, [name], (err, results) => {
                connection.release();
                if (err) return callback(err);
                if (!results[0]) return callback(null, null);
                let data = [];
                results.forEach(function(item) {
                    data.push(new Category(item));
                });
                callback(null, data);
            });
        });
    }
}
module.exports = Category;