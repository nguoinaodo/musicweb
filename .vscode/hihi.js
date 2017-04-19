static find(queryObj, page, callback) {
    const ProductImage = require(global.__base + 'models/product-image');
    const Category = require(global.__base + 'models/category');

    let tableList = ['product', 'user'];
    let joinConditions = [' product.userId = user.userId '];
    let queryList = [];
    let valueList = [];
    if (queryObj.userId) {
        queryList.push(' user.userId = ? ');
        valueList.push(queryObj.userId);
    }
    if (queryObj.districtId) {
        queryList.push(' districtId = ? ');
        valueList.push(queryObj.districtId);
    }
    if (queryObj.categoryId) {
        tableList = ['product', 'user', 'categorylink'];
        joinConditions = [' product.userId = user.userId ', ' categorylink.productId = product.productId '];
        queryList.push(' categorylink.categoryId = ? ');
        valueList.push(queryObj.categoryId);
    }
    if (queryObj.name) {
        queryList.push(' product.name LIKE ? ');
        valueList.push('%' + queryObj.name + '%');
    }
    if (queryObj.maxPrice) {
        queryList.push(' product.price <= ? ');
        valueList.push(queryObj.maxPrice);
    }
    if (queryObj.minPrice) {
        queryList.push(' product.price >= ? ');
        valueList.push(queryObj.minPrice);
    }
    if (queryObj.date) {
        queryList.push(' product.date >= ? ');
        valueList.push(queryObj.date);
    }
    let orderBy = ' productId ';
    let sort = ' DESC ';
    switch (queryObj.orderBy) {
        case 'productId':
            orderBy = ' product.productId ';
            break;
        case 'price':
            orderBy = ' price ';
            break;
        case 'date':
            orderBy = ' product.roductId ';
            break;
        case 'categoryId':
            orderBy = ' categorylink.categoryId ';
            break;
        case 'name':
            orderBy = ' product.name ';
            break;
        default:
            orderBy = ' product.productId ';
    }
    if (queryObj.sort === 'ASC') {
        sort = ' ASC ';
    }

    let query = 'SELECT * FROM ' + tableList.join(', ') +
        ' WHERE ' + joinConditions.join(' AND');
    if (queryList.length === 0) {
        query += ' ORDER BY ' + orderBy + sort + ' LIMIT ? OFFSET ?';
    } else {
        query += ' AND ' + queryList.join(' AND ') +
            ' ORDER BY ' + orderBy + sort + ' LIMIT ? OFFSET ?';
    }
    valueList.push(PAGE_LENGTH);
    valueList.push(page * PAGE_LENGTH);
    pool.query(query, valueList, (err, rows) => {
        if (err) {
            return callback(err);
        }
        if (!rows[0]) {
            return callback(null, []);
        }
        let result = [];
        let count = 0;
        let n = rows.length;
        rows.forEach((row, i) => {
            let product = new Product(row);
            // Categories
            Category.findByProductId(product.productId, (err, categories) => {
                if (err) {
                    return callback(err);
                }
                product.categories = categories;
                // Images
                ProductImage.findByProductId(product.productId, (err, images) => {
                    if (err) {
                        return callback(err);
                    }
                    product.images = images;
                    result[i] = product;
                    count++;
                    if (count === n) {
                        return callback(null, result);
                    }
                });
            });
        });
    });
}