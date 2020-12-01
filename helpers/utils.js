const fetch = require('node-fetch');
const settings = { method: "Get" };
const NodeCache = require('node-cache');
const ttl = 60 * 5 * 1; // cache for 5mins
const my_cache = new NodeCache({stdTTL: ttl, checkperiod: 120});

exports.getJsonPlaceHolderUri = (end_point) => {
    const uri = `${process.env.JSON_PLACEHOLDER_URI}/${end_point}/` || `https://jsonplaceholder.typicode.com/${end_point}/`;
    return uri;
}

exports.getInfo = async (id) => {
    let album_res = my_cache.get('album_' + id)
    if ( album_res == undefined ) {
        const album_uri = await this.getJsonPlaceHolderUri('albums') + id;
        album_res = await fetch(album_uri, settings).then(res => res.json());
    }

    my_cache.set('album_' + id, album_res);

    const user_id = album_res.userId;

    let user_res = my_cache.get('user_' + user_id);
    if ( user_res == undefined ) {
        const user_uri = await this.getJsonPlaceHolderUri('users') + user_id;
        user_res = await fetch(user_uri, settings).then(res => res.json());
    }

    my_cache.set('user_'+ user_id, user_res);

    let result = {
        id: id,
        user_id: user_id,
        title: album_res.title,
        name: user_res.username
    };
    return result;
}