/* 
Email a PDF attachment of an active Google Sheet from the Email address located in cell 'B1'
and then save it to a folder in Google Drive 
*/

const ss = SpreadsheetApp.getActiveSpreadsheet();
const tabs = ss.getSheets();
const ssId = ss.getId();
const driveId = "put Google Drive ID here";

function getFileAsBlob(exportUrl) {
  const response = UrlFetchApp.fetch(exportUrl, {
    muteHttpExceptions: true,
    headers: {
      Authorization: `Bearer ${ScriptApp.getOAuthToken()}`
    },
  });
  return response.getBlob();
}

function getCurrentSheetInfo() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const sheetName = sheet.getName();
  const sheetId = sheet.getSheetId();
  const sheetEmail = sheet.getRange(1, 2).getDisplayValue(); //get the email located in cell 'B1' getRange(1,2)
  return { sheetName, sheetId, sheetEmail };
}

function sendExportedSheetAsPDFAttachment() {
  const { sheetName, sheetId, sheetEmail } = getCurrentSheetInfo();

  const portrait = true;
  const size = 'a4';
  const topMargin = 0.75;
  const bottomMargin = 0.75;
  const leftMargin = 0.25;
  const rightMargin = 0.25;
  const gridlines = false;
  const scale = 4;
  const printnotes = false;

  const exportUrl = `https://docs.google.com/spreadsheets/d/${ssId}/export?format=pdf&portrait=${portrait}&size=${size}&top_margin=${topMargin}&bottom_margin=${bottomMargin}&left_margin=${leftMargin}&right_margin=${rightMargin}&gridlines=${gridlines}&scale=${scale}&printnotes=${printnotes}&gid=${sheetId}`;

  const pdfBlob = getFileAsBlob(exportUrl);
  pdfBlob.setName(sheetName);

  // HTML EMAIL TEMPLATE 
  const emailTemp = HtmlService.createTemplateFromFile("emailTemp");
  emailTemp.name = sheetName;
  const htmlForEmail = emailTemp.evaluate().getContent();

  // SEND EMAIL WITH ATTACHMENT
  const emailSubject = 'PDF EMAIL';
  const emailOptions = {
    name: emailSubject,
    htmlBody: htmlForEmail,
    attachments: [pdfBlob]
  };
  GmailApp.sendEmail(sheetEmail, emailSubject, '', emailOptions);

  
  saveBlobToDrive(pdfBlob, sheetName);
}

  // SAVE PDF TO DRIVE
function saveBlobToDrive(pdfBlob, sheetName) {
  pdfBlob.setName(sheetName)
  const file = DriveApp.getFolderById(driveId).createFile(pdfBlob);
  Logger.log(file.getUrl());
}
