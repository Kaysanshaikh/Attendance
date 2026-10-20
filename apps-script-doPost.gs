/* Paste this at the END of your Code.gs, then
   Deploy > Manage deployments > Edit > Version: New version > Deploy */
var API_ALLOWED = {
  getKioskState:getKioskState, recordPunch:recordPunch,
  adminLogin:adminLogin, getBootstrap:getBootstrap, getTodayBoard:getTodayBoard,
  getSalary:getSalary, getAllSalaries:getAllSalaries, getEmployees:getEmployees,
  saveEmployee:saveEmployee, saveSettings:saveSettings, saveDayStatus:saveDayStatus,
  adminSaveDay:adminSaveDay, deletePhoto:deletePhoto, savePayment:savePayment,
  deletePayment:deletePayment, saveAdvance:saveAdvance, deleteAdvance:deleteAdvance,
  saveLoanRecovery:saveLoanRecovery, saveWeeklyOff:saveWeeklyOff,
  startFresh:startFresh, buildMonthCsv:buildMonthCsv
};

function doPost(e) {
  var out;
  try {
    var req = JSON.parse(e.postData.contents);
    var fn = API_ALLOWED[req.fn];
    if (!fn) throw new Error('Unknown function');
    out = { ok: true, data: fn.apply(null, req.args || []) };
  } catch (err) {
    out = { ok: false, error: String(err.message || err) };
  }
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}
