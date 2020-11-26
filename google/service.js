const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./client_secret.json');

exports.sheet_process = async (list) => {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
    const gcaa = await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads sheets
    const sheet = doc.sheetsByIndex[0];
    sheet.setHeaderRow(['Name', 'Title']);
    sheet.addRows(list);
}
