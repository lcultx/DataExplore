var mogHelper = require('../../library/mogHelper');
function loadRouters(app) {
    mogHelper.init(function () {
        app.get('/yesterday_events', require('./get_yesterday_events'));
        app.get('/pay_point', require('./get_pay_point'));
        app.get('/gender_pay_contrast', require('./get_gender_pay_contrast'));
        app.get('/gender_pay_contrast_db', require('./get_gender_pay_contrast_from_db'));
    });
}
exports.loadRouters = loadRouters;
//# sourceMappingURL=index.js.map