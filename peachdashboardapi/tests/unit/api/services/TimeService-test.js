/**
 * Created by BlackLinden on 20/08/2016.
 */
var chai = require('chai');
console.log(process.cwd());
var TimeService = require('../../../../api/services/TimeService.js');
chai.should();


describe('TimeService', function() {

  describe('strtotime()', function() {
    var now = 1452945600;
    it('should convert strings of type "N days ago" into a timestamp', function (done) {
      TimeService.strtotime('2 days ago', now).should.equal(1452772800);
      done();
    });

    it('should convert strings of type "N weeks ago" into a timestamp', function (done) {
      TimeService.strtotime('5 weeks ago', now).should.equal(1449921600);
      done();
    });

    it('should convert strings of type "N months ago" into a timestamp', function (done) {
      TimeService.strtotime('11 months ago', now).should.equal(1424088000);
      done();
    });

    it('should convert strings of type "N years ago" into a timestamp', function (done) {
      TimeService.strtotime('2 years ago', now).should.equal(1389873600);
      done();
    });

    it('should convert strings of type "Last *weekday*" into a timestamp', function (done) {
      TimeService.strtotime('last monday', now).should.equal(1452513600);
      done();
    });

    it('should convert strings of type "Last week" into a timestamp', function (done) {
      TimeService.strtotime('Last week', now).should.equal(1452340800);
      done();
    });

    it('should convert strings of type "*day, Day Mon Year HH:MM:SS TIMEZONE " into a timestamp', function (done) {
      TimeService.strtotime('Tue, 15 Sep 2015 12:00:00 GMT', now).should.equal(1442318400);
      done();
    });

    it('should convert strings of type "D/M/Y (H)H:MM:SS (AM/PM) " into a timestamp', function (done) {
      TimeService.strtotime('9/15/2015, 1:00:00 PM', now).should.equal(1442318400);
      done();
    });

    it('should convert strings of type ISO 8601 into a timestamp', function (done) {
      TimeService.strtotime('2015-09-15T13:00:00+01:00', now).should.equal(1442318400);
      done();
    });

    it('should convert strings of type RFC 2822 time into a timestamp', function (done) {
      TimeService.strtotime('Tue, 15 Sep 2015 13:00:00 +01:00', now).should.equal(1442318400);
      done();
    });
  });
});
