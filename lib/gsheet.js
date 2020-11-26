const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../google/client_secret.json');

exports.getDoc = async () => {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads sheets
    return doc;
}
