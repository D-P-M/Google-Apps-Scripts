// function testExportSheetAsPDF() {
//  let blob = getFileAsBlob("https://docs.google.com/spreadsheets/d/12ThMWz470re_VEqOnt1bw0MXHHJxi1KxjUqpDz93L1I/export?format=pdf&portrait=false&size=b5&gridlines=false");
//  Logger.log("Content type: " + blob.getContentType());
//  Logger.log("File size in MB: " + blob.getBytes().length / 1000000);
// }


const SS = SpreadsheetApp.getActiveSpreadsheet();
const TABS = SS.getSheets();
const SSID = SS.getId();

function getFileAsBlob(exportUrl) {
 let response = UrlFetchApp.fetch(exportUrl, {
     muteHttpExceptions: true,
     headers: {
       Authorization: 'Bearer ' +  ScriptApp.getOAuthToken(),
     },
   });
 return response.getBlob();
}

function getSheetName(){
  let sheetName = SpreadsheetApp.getActive().getSheetName();
  console.log(sheetName)
  return sheetName;
}

function getSheetEmail(){
  let sheetEmail = SpreadsheetApp.getActiveSheet().getRange(1,2).getDisplayValues().toString();
  console.log(sheetEmail)
  return sheetEmail;
}

function getSheetIdFromName(sheetName) {
 let getSheetName = SpreadsheetApp.getActive().getSheetName();
  // Logger.log(getSheetName); 
 let sheet = SpreadsheetApp.getActive().getSheetByName(getSheetName).getSheetId();
 if(sheet)
   return sheet;
 return null;
}


function sendExportedSheetAsPDFAttachment() {
  
  let name = getSheetName();
  let email = getSheetEmail();
  // const date = getDate();

  let sheetGID = getSheetIdFromName();
  const portrait = true;
  const size = 'a4';
  const topMargin = 0.75;
  const bottomMargin = 0.75;
  const leftMargin = 0.25;
  const rightMargin = 0.25;
  const gridlines = false;
  const scale = 4;
  const printnotes = false;

  let blob = getFileAsBlob("https://docs.google.com/spreadsheets/d/"+SSID+"/export?format=pdf&portrait="+portrait
                                                                                            +"&size="+size
                                                                                            +"&top_margin="+topMargin
                                                                                            +"&bottom_margin="+bottomMargin
                                                                                            +"&left_margin="+leftMargin
                                                                                            +"&right_margin="+rightMargin
                                                                                            +"&gridlines="+gridlines
                                                                                            +"&scale="+scale
                                                                                            +"&printnotes="+printnotes
                                                                                            +"&gid="+sheetGID);


  // HTML EMAIL TEMPLATE 
  const emailTemp = HtmlService.createTemplateFromFile("emailTemp");
  emailTemp.name = name;
 
  const htmlForEmail = emailTemp.evaluate().getContent();

    GmailApp.sendEmail(email,name,
    "",
      { name: 'PDF EMAIL',
      htmlBody: htmlForEmail,
      attachments: [blob.setName(name)]
      });
  
    exportSheetAsPDFToDrive(blob);  
}


function exportSheetAsPDFToDrive(blob) {
  const driveID = "1pWx0dMFWs__Nv6ekUArP4To-7FB0LaYo";
  let name = getSheetName();

  blob.setName(name)
  let file = DriveApp.getFolderById(driveID).createFile(blob);
  Logger.log(file.getUrl());
}

