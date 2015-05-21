var deepEqual = require('../utils/test_utils.js').deepEqual;
var dbu = require('../../lib/dbutils.js');
var router = require('../utils/test_router.js');

describe('Handle invalid requests', function() {

    before(function () { return router.setup(); });

    it('try a put on a non existing table', function() {
        return router.request({
            uri: '/restbase.cassandra.test.local/sys/table/unknownTable/',
            method: 'put',
            body: {
                table: 'unknownTable',
                attributes: {
                    key: 'testing',
                    tid: dbu.testTidFromDate(new Date('2013-08-08 18:43:58-0700')),
                }
            }
        })
        .then(function(response) {
            deepEqual(response.status, 500);
        });
    });

    it('try a get on a non existing table', function() {
        return router.request({
            uri: '/restbase.cassandra.test.local/sys/table/unknownTable/',
            method: 'get',
            body: {
                table: 'unknownTable',
                attributes: {
                    key: 'testing',
                    tid: dbu.testTidFromDate(new Date('2013-08-08 18:43:58-0700')),
                }
            }
        })
        .then(function(response) {
            deepEqual(response.status, 500);
        });
    });
});