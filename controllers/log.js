const { GoogleSpreadsheet } = require('google-spreadsheet');
const utils = require('../helpers/utils')
var creds = require('../google/client_secret.json');


exports.saveInfo = async (req, res) => {
    let status = 'success';
    let message = 'The log has been saved into the google spread sheet successfully.';

    try {
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo(); // loads sheets
        let sheet = doc.sheetsByIndex[0];
        sheet.setHeaderRow(['Name', 'Title']);
        let idList = req.body.params;
        let queue = [];
        idList .forEach((id) => {
            queue.push(
                utils.getInfo(id)
                    .then( data => {
                        return sheet.addRow({
                            Name: data.name,
                            Title: data.title
                        });
                    })
            )
        });

        await Promise.all(queue);
    } catch (error) {
        status = 'error';
        message = error;
    }

    let result = {
        'status': status,
        'message': message
    };
    res.send(result);
}