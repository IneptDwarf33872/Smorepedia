function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var express = require("express");
//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
var bodyParser = require("body-parser");
var Region = require("oracle-nosqldb").Region;
var ServiceType = require("oracle-nosqldb/lib/constants").ServiceType;
var NoSQLClient = require("oracle-nosqldb").NoSQLClient;
var app = express();
app.use(bodyParser.json());
var client = new NoSQLClient({
    region: Region.US_ASHBURN_1,
    serviceType: ServiceType.CLOUD,
    compartment: "ocid1.compartment.oc1..aaaaaaaahaycpzfjgklhl4e7jic6xoufxxwwtxcylcl3fpsiooyycamd5igq",
    auth: {
        iam: {
            tenantId: "ocid1.tenancy.oc1..aaaaaaaabgpwfc7gq645lm7h6wjehohak2fd4xbedpvrmpplh3egjvjvnhgq",
            userId: "ocid1.user.oc1..aaaaaaaanamjf2u5sdw57hsuuvi4adbeotpigzolekzehywix3ilz6osb3yq",
            fingerprint: "9e:23:38:8a:5b:b6:c7:b5:16:b6:72:1a:a5:92:9f:75",
            passphrase: "",
            privateKeyFile: "./.oci/privateKey.pem"
        }
    }
});
app.post('/add', function() {
    var _ref = _async_to_generator(function(req, res) {
        var _req_body, id, title, content, infobox, result, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _req_body = req.body, id = _req_body.id, title = _req_body.title, content = _req_body.content, infobox = _req_body.infobox;
                    console.log(id);
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        client.put('pages', {
                            id: id,
                            title: title,
                            content: content,
                            infobox: infobox
                        })
                    ];
                case 2:
                    result = _state.sent();
                    console.log(result);
                    res.json({
                        result: result.success
                    });
                    if (!result.consumedCapacity) {
                        res.status(500).json({
                            error: 'Failed to add item'
                        });
                    }
                    return [
                        3,
                        4
                    ];
                case 3:
                    err = _state.sent();
                    console.error('failed to insert data', err);
                    res.status(500).json({
                        error: err
                    });
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function(req, res) {
        return _ref.apply(this, arguments);
    };
}());
app.get("/maxid", function() {
    var _ref = _async_to_generator(function(req, res) {
        var result, highest, i, jayson, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        2,
                        ,
                        3
                    ]);
                    return [
                        4,
                        client.query('SELECT id FROM pages')
                    ];
                case 1:
                    result = _state.sent();
                    result = result.rows;
                    highest = 0;
                    for(i = 0; i < result.length; i++){
                        if (result[i].id > highest) {
                            highest = result[i].id;
                        }
                    }
                    jayson = {
                        high: highest
                    };
                    console.log(jayson.high);
                    res.json(jayson);
                    return [
                        3,
                        3
                    ];
                case 2:
                    err = _state.sent();
                    console.error("failed to get data", err);
                    res.status(500).json({
                        error: err
                    });
                    return [
                        3,
                        3
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    });
    return function(req, res) {
        return _ref.apply(this, arguments);
    };
}());
app.get("/byid", function() {
    var _ref = _async_to_generator(function(req, res) {
        var id, result, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        2,
                        ,
                        3
                    ]);
                    id = req.body.id;
                    console.log("ID: " + id);
                    return [
                        4,
                        client.get('pages', {
                            id: id
                        })
                    ];
                case 1:
                    result = _state.sent();
                    res.json(result.row);
                    return [
                        3,
                        3
                    ];
                case 2:
                    err = _state.sent();
                    console.error("failed to get data", err);
                    res.status(500).json({
                        error: err
                    });
                    return [
                        3,
                        3
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    });
    return function(req, res) {
        return _ref.apply(this, arguments);
    };
}());
app.delete('/byid', function() {
    var _ref = _async_to_generator(function(req, res) {
        var id, result, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    id = req.body.id;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        client.delete('pages', {
                            id: id
                        })
                    ];
                case 2:
                    result = _state.sent();
                    res.json({
                        result: result.success
                    });
                    return [
                        3,
                        4
                    ];
                case 3:
                    err = _state.sent();
                    console.error('failed to delete data', err);
                    res.status(500).json({
                        error: err
                    });
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return function(req, res) {
        return _ref.apply(this, arguments);
    };
}());
app.get("/", function() {
    var _ref = _async_to_generator(function(req, res) {
        var result, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        2,
                        ,
                        3
                    ]);
                    return [
                        4,
                        client.query('SELECT * FROM pages')
                    ];
                case 1:
                    result = _state.sent();
                    res.json(result.rows);
                    return [
                        3,
                        3
                    ];
                case 2:
                    err = _state.sent();
                    console.error("failed to get data", err);
                    res.status(500).json({
                        error: err
                    });
                    return [
                        3,
                        3
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    });
    return function(req, res) {
        return _ref.apply(this, arguments);
    };
}());
app.get("/byprop", function() {
    var _ref = _async_to_generator(function(req, res) {
        var prop, result, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        2,
                        ,
                        3
                    ]);
                    prop = req.body.prop;
                    return [
                        4,
                        client.query("SELECT ".concat(prop, " FROM pages"))
                    ];
                case 1:
                    result = _state.sent();
                    res.json(result.rows);
                    return [
                        3,
                        3
                    ];
                case 2:
                    err = _state.sent();
                    console.error("failed to get data", err);
                    res.status(500).json({
                        error: err
                    });
                    return [
                        3,
                        3
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    });
    return function(req, res) {
        return _ref.apply(this, arguments);
    };
}());
module.exports = app;
