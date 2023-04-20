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
  let sheetEmail = SpreadsheetApp.getActiveSheet().getRange(1,12).getDisplayValues().toString();
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

// console.log(getSheetIdFromName())


function sendExportedSheetAsPDFAttachment() {
  
  let name = getSheetName();
  let email = getSheetEmail();
  const date = getDate();

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
  const emailTemp = HtmlService.createTemplateFromFile("EMAIL TEMPLATE");
  emailTemp.name = name;
 
  const htmlForEmail = emailTemp.evaluate().getContent();

  // Get GMAIL ALIASES
  const aliases = GmailApp.getAliases();
  Logger.log(aliases);
  Logger.log(aliases[0]);

    // Send email from alias
    if (aliases.length > 0) {
    GmailApp.sendEmail(email,date+" PAY • "+name,
    "",
      { name: 'ACES PAYROLL',from:aliases[3],
      htmlBody: htmlForEmail,
      attachments: [blob.setName(date+" PAY • "+name)]
      });
    }

    exportSheetAsPDFToDrive(blob);
    dialogueBox(name);
}

function exportSheetAsPDFToDrive(blob) {
  const date = getDate();
  let name = getSheetName();

  blob.setName(date+" PAY • "+name)
  let file = DriveApp.getFolderById(driveIDEmailed).createFile(blob);
  Logger.log(file.getUrl());
}

function dialogueBox(name){
  // The code below displays "hello world" in a dialog box with an OK button
  Browser.msgBox('📤 A PDF of '+name+ "'s pay has been emailed.")
}