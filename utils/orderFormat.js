function orderFormate(obj) {
    var retObj = {};
    retObj.author = obj.get('author');
    retObj.id = obj.id;
    retObj.title = obj.get('title');
    retObj.content = obj.get('content');
    retObj.url = obj.get('url');
    retObj.pictures = obj.get('pictures');
    retObj.comments = obj.get('comments');
    retObj.description = obj.get('description');
    retObj.updatedAt = obj.updatedAt;
    retObj.createdAt = obj.createdAt;
    return retObj;
}

module.exports = {
    orderFormat: orderFormate
}