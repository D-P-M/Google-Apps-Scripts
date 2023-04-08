
//Get form submission responses
function emailSubmissions(e) {
    const emailList = ["your_email(s)_goes_here"];
    const form = FormApp.openById('form_ID_goes_here');
    const responses = form.getResponses();
    const latestResponse = responses[responses.length - 1];
    const itemResponses = latestResponse.getItemResponses();
    const submissionAnswers = [];
  
    for (let i = 0; i < itemResponses.length; i++) {
      const item = itemResponses[i].getItem();
      if (item.getType() === FormApp.ItemType.PAGE_BREAK) continue;
      const answer = itemResponses[i].getResponse();
      submissionAnswers.push(answer);
    }
  
    sendEmail(emailList, submissionAnswers, e.response.getRespondentEmail());
    return submissionAnswers;
  }
  
  //Send email to all recipients defined in 'emailList' const
  function sendEmail(emailList, submissionAnswers, address) {
    const html = `
      <p style="font-size: 20px">Email Submissions</p>
      <p><hr></p>
      <p>Email: ${address}<br>
      Phone: ${submissionAnswers[3]}<br><br>
      First name: ${submissionAnswers[0]}<br>
      Last name: ${submissionAnswers[1]}<br>
      DOB: ${submissionAnswers[2]}<br>
      Favorite color: ${submissionAnswers[4]}</p><br>
      <a href="spreadsheet_ID_goes_here">Click to access spreadsheet!</a>`;
  
    GmailApp.sendEmail(emailList,submissionAnswers[0]+" "+submissionAnswers[1]+" : "+submissionAnswers[3],
    "",
    { name: 'Email Submissions',
      htmlBody: html,
  
      });
    }
  
