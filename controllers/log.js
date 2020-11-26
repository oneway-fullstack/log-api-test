const utils = require('../helpers/utils')
const creds = require('../google/client_secret.json');
const google = require('../google/service');

exports.saveInfo = async (req, res) => {
    let status = 'success';
    let message = 'The log has been saved into the google spread sheet successfully.';

    //try
    {
        const idList =[...new Set(req.body.params)];

        let queue = [];
        idList.forEach(async (id) => {
            queue.push(
                utils.getInfo(id)
                    .then( data => {
                        return {
                            Name: data.name,
                            Title: data.title
                        };
                    })
            )
        });
        const list = await Promise.all(queue);
        await google.sheet_process(list);
    } /*catch (error) {
        status = 'error';
        message = error;
    }*/

    let result = {
        'status': status,
        'message': message
    };
    res.send(result);
}