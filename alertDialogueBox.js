/*
From Google Documentation:
"An alert is a pre-built dialog box that opens inside a Google Docs, Sheets, Slides, 
or Forms editor. It displays a message and an "OK" button; a title and alternative buttons are optional. 
It is similar to calling window.alert() in client-side JavaScript within a web browser.

Alerts suspend the server-side script while the dialog is open. The script resumes after the user closes the dialog, 
but JDBC connections do not persist across the suspension.

As shown in the example below, Google Docs, Forms, Slides, and Sheets all use the method Ui.alert(), 
which is available in three variants. To override the default "OK" button, pass a value from the Ui.ButtonSet enum 
as the buttons argument. To evaluate which button the user clicked, compare the return value for alert() to the Ui.Button enum."
*/

function onOpen() {
    SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
        .createMenu('Create Your Menu')
        .addItem('Alert Box', 'alertBox')
        .addToUi();
  }
  
  function alertBox() {
    var ui = SpreadsheetApp.getUi(); // Same variations.
  
    var result = ui.alert(
       'Confirm',
       'Are you sure you want to continue?',
        ui.ButtonSet.YES_NO);
  
    // Process the user's response.
    if (result == ui.Button.YES) {
      // User clicked "Yes".
      ui.alert('Confirmation received.');
    } else {
      // User clicked "No" or X in the title bar.
      ui.alert('Permission denied.');
    }
  }