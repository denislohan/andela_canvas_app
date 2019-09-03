export default (submission)=>{
  submission.due_date = submission.due_date.split('T')[0]+'T15:00:00Z' // settting the time to be reasonalble
  return  {
    title: submission.assignName,
    description: 'Endeavour to deliver this output not later than this date',
    location: 'N/A',
    startTime: submission.due_date,
    endTime: submission.due_date
  }     
}
