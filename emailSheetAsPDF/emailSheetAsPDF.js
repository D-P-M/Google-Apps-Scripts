// function testExportSheetAsPDF() {
//  let blob = getFileAsBlob("https://docs.google.com/spreadsheets/d/12ThMWz470re_VEqOnt1bw0MXHHJxi1KxjUqpDz93L1I/export?format=pdf&portrait=false&size=b5&gridlines=false");
//  Logger.log("Content type: " + blob.getContentType());
//  Logger.log("File size in MB: " + blob.getBytes().length / 1000000);
// }


const ss = SpreadsheetApp.getActiveSpreadsheet();
const tabs = ss.getSheets();
const ssId = ss.getId();
const driveId = "1pWx0dMFWs__Nv6ekUArP4To-7FB0LaYo";

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
  const sheetEmail = sheet.getRange(1, 2).getDisplayValue();
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
