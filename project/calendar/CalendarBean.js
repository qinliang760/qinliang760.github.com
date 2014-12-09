// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (CalendarBean == null) var CalendarBean = {};
CalendarBean._path = '/dwr';
CalendarBean.getSC2CalendarCount = function(p0, p1, callback) {
  dwr.engine._execute(CalendarBean._path, 'CalendarBean', 'getSC2CalendarCount', p0, p1, callback);
}
CalendarBean.getSC2CalendarsByTime = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(CalendarBean._path, 'CalendarBean', 'getSC2CalendarsByTime', p0, p1, p2, p3, callback);
}
CalendarBean.getAllSC2CalendarsByTime = function(p0, p1, callback) {
  dwr.engine._execute(CalendarBean._path, 'CalendarBean', 'getAllSC2CalendarsByTime', p0, p1, callback);
}