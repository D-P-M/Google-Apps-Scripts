function eraseContentFromAllTabs() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = sheet.getSheets();
  
  for (var i = 0; i < sheets.length; i++) {
    sheets[i].clearContents();
  }
}