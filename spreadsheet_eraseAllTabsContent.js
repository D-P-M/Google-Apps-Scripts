
//This function erases all of the content from all of the tabs in a sheet
function eraseContentFromAllTabs() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = sheet.getSheets();
  
  for (var i = 0; i < sheets.length; i++) {
    sheets[i].clearContents();
  }
}