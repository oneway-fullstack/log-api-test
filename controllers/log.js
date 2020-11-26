const utils = require('../helpers/utils')
const { getDoc } = require('../lib/gsheet');

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
        const doc = await getDoc();
        const sheet = doc.sheetsByIndex[0];

        await sheet.addRows(list);
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