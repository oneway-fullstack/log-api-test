const fetch = require('node-fetch');
const settings = { method: "Get" };

exports.getJsonPlaceHolderUri = (end_point) => {
    const uri = `${process.env.JSON_PLACEHOLDER_URI}/${end_point}/` || `https://jsonplaceholder.typicode.com/${end_point}/`;
    return uri;
}

exports.getInfo = async (id) => {
    const album_uri = await this.getJsonPlaceHolderUri('albums') + id;
    const album_res = await fetch(album_uri, settings).then(res => res.json());

    const user_uri = await this.getJsonPlaceHolderUri('users') + album_res.userId;
    const user_res = await fetch(user_uri, settings).then(res => res.json());

    let result = {
        id: id,
        user_id: album_res.userId,
        title: album_res.title,
        name: user_res.username
    };
    return result;
}