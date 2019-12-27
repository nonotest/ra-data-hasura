(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ra-data-hasura", [], factory);
	else if(typeof exports === 'object')
		exports["ra-data-hasura"] = factory();
	else
		root["ra-data-hasura"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _queries = __webpack_require__(/*! ./queries */ "./src/queries.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_PRIMARY_KEY = 'id';

var cloneQuery = function cloneQuery(query) {
  return JSON.parse(JSON.stringify(query));
};

var _default = function _default(serverEndpoint, httpClient, config) {
  var getTableSchema = function getTableSchema(resource) {
    var tableName;
    var schema; // parse schema in resource

    if (resource && resource.split('.').length === 1) {
      schema = 'public';
      tableName = resource;
    } else if (resource && resource.split('.').length === 2) {
      var resourceSplit = resource.split('.');
      schema = resourceSplit[0];
      tableName = resourceSplit[1];
    } else {
      throw new Error(JSON.stringify({
        error: 'Invalid table/schema resource'
      }));
    }

    return {
      schema: schema,
      tableName: tableName
    };
  };

  var getPrimaryKey = function getPrimaryKey(resource) {
    var primaryKey = DEFAULT_PRIMARY_KEY;

    if (config && config['primaryKey'][resource]) {
      primaryKey = config['primaryKey'][resource];
    }

    return primaryKey;
  };

  var addFilters = function addFilters(where, filter) {
    if (!filter) return where;
    var filterKeys = Object.keys(filter);
    if (filterKeys.length === 0) return where;
    var whereCopy = Object.assign(where);
    filterKeys.forEach(function (key) {
      whereCopy[key] = filter[key];
    });
    return whereCopy;
  };

  var convertDataRequestToHTTP = function convertDataRequestToHTTP(type, resource, params) {
    var options = {};
    var finalQuery = {};
    var tableSchema = getTableSchema(resource);
    var schema = tableSchema.schema,
        tableName = tableSchema.tableName;
    var primaryKey = getPrimaryKey(resource);

    switch (type) {
      case 'GET_LIST':
        // select multiple
        var finalSelectQuery = cloneQuery(_queries.selectQuery);
        var finalCountQuery = cloneQuery(_queries.countQuery); // small hack, take the "q" filter and move the value to the root.

        if (params.filter && params.filter.q) {
          var q = params.filter.q;
          delete params.filter['q'];
          params.filter = { ...params.filter,
            ...q
          };
        }

        finalSelectQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalSelectQuery.args.limit = params.pagination.perPage;
        finalSelectQuery.args.offset = params.pagination.page * params.pagination.perPage - params.pagination.perPage;
        finalSelectQuery.args.where = params.filter;
        finalSelectQuery.args.order_by = {
          column: params.sort.field || primaryKey,
          type: typeof params.sort.order === 'undefined' ? 'asc' : params.sort.order.toLowerCase()
        };
        finalCountQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalCountQuery.args.where = {};
        finalCountQuery.args.where[primaryKey] = {
          $ne: null
        };
        finalCountQuery.args.where = addFilters(finalCountQuery.args.where, params.filter);
        finalQuery = cloneQuery(_queries.bulkQuery);
        finalQuery.args.push(finalSelectQuery);
        finalQuery.args.push(finalCountQuery);
        break;

      case 'GET_ONE':
        // select one
        finalQuery = cloneQuery(_queries.selectQuery);
        finalQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalQuery.args.where = {};
        finalQuery.args.where[primaryKey] = {
          $eq: params.id
        };
        break;

      case 'CREATE':
        // create one
        var createFields = Object.keys(params.data);
        finalQuery = cloneQuery(_queries.insertQuery);
        finalQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalQuery.args.objects.push(params.data);
        createFields.push(primaryKey);
        finalQuery.args.returning = createFields;
        break;

      case 'UPDATE':
        // update one
        var updateFields = Object.keys(params.data);
        finalQuery = cloneQuery(_queries.updateQuery);
        finalQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalQuery.args['$set'] = params.data;
        finalQuery.args.where = {};
        finalQuery.args.where[primaryKey] = {
          $eq: params.id
        };
        updateFields.push(primaryKey);
        finalQuery.args.returning = updateFields;
        break;

      case 'UPDATE_MANY':
        // update multiple ids with given data
        var updateManyFields = Object.keys(params.data);
        finalQuery = cloneQuery(_queries.updateQuery);
        finalQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalQuery.args['$set'] = params.data;
        finalQuery.args.where = {};
        finalQuery.args.where[primaryKey] = {
          $in: params.ids
        };
        updateManyFields.push(primaryKey);
        finalQuery.args.returning = updateManyFields;
        break;

      case 'DELETE':
        // delete one
        var deleteFields = Object.keys(params.previousData);
        finalQuery = cloneQuery(_queries.deleteQuery);
        finalQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalQuery.args.where = {};
        finalQuery.args.where[primaryKey] = {
          $eq: params.id
        };
        deleteFields.push(primaryKey);
        finalQuery.args.returning = deleteFields;
        break;

      case 'DELETE_MANY':
        // delete multiple
        finalQuery = cloneQuery(_queries.deleteQuery);
        finalQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalQuery.args.where = {};
        finalQuery.args.where[primaryKey] = {
          $in: params.ids
        };
        finalQuery.args.returning = [primaryKey];
        break;

      case 'GET_MANY':
        // select multiple within where clause
        var finalManyQuery = cloneQuery(_queries.selectQuery);
        var finalManyCountQuery = cloneQuery(_queries.countQuery);
        finalManyQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalManyQuery.args.where = {};
        finalManyQuery.args.where[primaryKey] = {
          $in: params.ids
        };
        finalManyQuery.args.where = addFilters(finalManyQuery.args.where, params.filter);
        finalManyCountQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalManyCountQuery.args.where = {};
        finalManyCountQuery.args.where[primaryKey] = {
          $ne: null
        };
        finalManyCountQuery.args.where = addFilters(finalManyCountQuery.args.where, params.filter);
        finalQuery = cloneQuery(_queries.bulkQuery);
        finalQuery.args.push(finalManyQuery);
        finalQuery.args.push(finalManyCountQuery);
        break;

      case 'GET_MANY_REFERENCE':
        // select multiple with relations
        var finalManyRefQuery = cloneQuery(_queries.selectQuery);
        var finalManyRefCountQuery = cloneQuery(_queries.countQuery);
        finalManyRefQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalManyRefQuery.args.limit = params.pagination.perPage;
        finalManyRefQuery.args.offset = params.pagination.page * params.pagination.perPage - params.pagination.perPage;
        finalManyRefQuery.args.where = _defineProperty({}, params.target, params.id);
        finalManyRefQuery.args.where = addFilters(finalManyRefQuery.args.where, params.filter);
        finalManyRefQuery.args.order_by = {
          column: params.sort.field || primaryKey,
          type: typeof params.sort.order === 'undefined' ? 'asc' : params.sort.order.toLowerCase()
        };
        finalManyRefCountQuery.args.table = {
          name: tableName,
          schema: schema
        };
        finalManyRefCountQuery.args.where = {};
        finalManyRefCountQuery.args.where[primaryKey] = {
          $ne: null
        };
        finalManyRefCountQuery.args.where = addFilters(finalManyRefQuery.args.where, params.filter);
        finalQuery = cloneQuery(_queries.bulkQuery);
        finalQuery.args.push(finalManyRefQuery);
        finalQuery.args.push(finalManyRefCountQuery);
        break;

      default:
        throw new Error("Unsupported type ".concat(type));
    }

    options.body = JSON.stringify(finalQuery);
    return {
      options: options
    };
  };

  var convertHTTPResponse = function convertHTTPResponse(response, type, resource, params) {
    // handle errors and throw with the message
    if ('error' in response || 'code' in response) {
      throw new Error(JSON.stringify(response));
    }

    var primaryKey = getPrimaryKey(resource);

    if (primaryKey !== DEFAULT_PRIMARY_KEY) {
      if (Array.isArray(response[0])) {
        response[0].forEach(function (res) {
          res[DEFAULT_PRIMARY_KEY] = res[primaryKey];
        });
      } else {
        response[0][DEFAULT_PRIMARY_KEY] = response[0][primaryKey];
      }
    }

    switch (type) {
      case 'GET_LIST':
        return {
          data: response[0],
          total: response[1]['count']
        };

      case 'GET_ONE':
        return {
          data: response[0]
        };

      case 'CREATE':
        return {
          data: response.returning[0]
        };

      case 'UPDATE':
        return {
          data: response.returning[0]
        };

      case 'UPDATE_MANY':
        var updatedIds = response.returning.map(function (item) {
          return item.id;
        });
        return {
          data: updatedIds
        };

      case 'DELETE':
        return {
          data: response.returning[0]
        };

      case 'DELETE_MANY':
        var deletedIds = response.returning.map(function (item) {
          return item.id;
        });
        return {
          data: deletedIds
        };

      case 'GET_MANY':
        return {
          data: response[0]
        };

      case 'GET_MANY_REFERENCE':
        return {
          data: response[0],
          total: response[1].count
        };

      default:
        return {
          data: response
        };
    }
  };

  return function (type, resource, params) {
    var _convertDataRequestTo = convertDataRequestToHTTP(type, resource, params),
        options = _convertDataRequestTo.options;

    options.method = 'POST';

    if (typeof httpClient === 'function') {
      // support httpClient argument
      return httpClient(serverEndpoint + '/v1/query', options).then(function (response) {
        return convertHTTPResponse(response.json, type, resource, params);
      });
    }

    options.headers = httpClient; // backwards compatible static header object

    return fetch(serverEndpoint + '/v1/query', options).then(function (response) {
      return response.json().then(function (data) {
        return convertHTTPResponse(data, type, resource, params);
      });
    });
  };
};

exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/queries.js":
/*!************************!*\
  !*** ./src/queries.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteQuery = exports.updateQuery = exports.insertQuery = exports.countQuery = exports.selectQuery = exports.bulkQuery = void 0;
// define hasura json api queries
var bulkQuery = {
  type: 'bulk',
  args: []
};
exports.bulkQuery = bulkQuery;
var selectQuery = {
  type: 'select',
  args: {
    table: {
      'schema': '',
      'name': ''
    },
    columns: ['*']
  }
};
exports.selectQuery = selectQuery;
var countQuery = {
  type: 'count',
  args: {
    table: {
      'schema': '',
      'name': ''
    },
    where: {}
  }
};
exports.countQuery = countQuery;
var insertQuery = {
  type: 'insert',
  args: {
    table: {
      'schema': '',
      'name': ''
    },
    objects: [],
    returning: []
  }
};
exports.insertQuery = insertQuery;
var updateQuery = {
  type: 'update',
  args: {
    table: {
      'schema': '',
      'name': ''
    },
    $set: {},
    where: {},
    returning: []
  }
};
exports.updateQuery = updateQuery;
var deleteQuery = {
  type: 'delete',
  args: {
    table: {
      'schema': '',
      'name': ''
    },
    $set: {},
    where: {},
    returning: []
  }
};
exports.deleteQuery = deleteQuery;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yYS1kYXRhLWhhc3VyYS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vcmEtZGF0YS1oYXN1cmEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmEtZGF0YS1oYXN1cmEvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmEtZGF0YS1oYXN1cmEvLi9zcmMvcXVlcmllcy5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX1BSSU1BUllfS0VZIiwiY2xvbmVRdWVyeSIsInF1ZXJ5IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwic2VydmVyRW5kcG9pbnQiLCJodHRwQ2xpZW50IiwiY29uZmlnIiwiZ2V0VGFibGVTY2hlbWEiLCJyZXNvdXJjZSIsInRhYmxlTmFtZSIsInNjaGVtYSIsInNwbGl0IiwibGVuZ3RoIiwicmVzb3VyY2VTcGxpdCIsIkVycm9yIiwiZXJyb3IiLCJnZXRQcmltYXJ5S2V5IiwicHJpbWFyeUtleSIsImFkZEZpbHRlcnMiLCJ3aGVyZSIsImZpbHRlciIsImZpbHRlcktleXMiLCJPYmplY3QiLCJrZXlzIiwid2hlcmVDb3B5IiwiYXNzaWduIiwiZm9yRWFjaCIsImtleSIsImNvbnZlcnREYXRhUmVxdWVzdFRvSFRUUCIsInR5cGUiLCJwYXJhbXMiLCJvcHRpb25zIiwiZmluYWxRdWVyeSIsInRhYmxlU2NoZW1hIiwiZmluYWxTZWxlY3RRdWVyeSIsImZpbmFsQ291bnRRdWVyeSIsInEiLCJhcmdzIiwidGFibGUiLCJuYW1lIiwibGltaXQiLCJwYWdpbmF0aW9uIiwicGVyUGFnZSIsIm9mZnNldCIsInBhZ2UiLCJvcmRlcl9ieSIsImNvbHVtbiIsInNvcnQiLCJmaWVsZCIsIm9yZGVyIiwidG9Mb3dlckNhc2UiLCIkbmUiLCJwdXNoIiwiJGVxIiwiaWQiLCJjcmVhdGVGaWVsZHMiLCJkYXRhIiwib2JqZWN0cyIsInJldHVybmluZyIsInVwZGF0ZUZpZWxkcyIsInVwZGF0ZU1hbnlGaWVsZHMiLCIkaW4iLCJpZHMiLCJkZWxldGVGaWVsZHMiLCJwcmV2aW91c0RhdGEiLCJmaW5hbE1hbnlRdWVyeSIsImZpbmFsTWFueUNvdW50UXVlcnkiLCJmaW5hbE1hbnlSZWZRdWVyeSIsImZpbmFsTWFueVJlZkNvdW50UXVlcnkiLCJ0YXJnZXQiLCJib2R5IiwiY29udmVydEhUVFBSZXNwb25zZSIsInJlc3BvbnNlIiwiQXJyYXkiLCJpc0FycmF5IiwicmVzIiwidG90YWwiLCJ1cGRhdGVkSWRzIiwibWFwIiwiaXRlbSIsImRlbGV0ZWRJZHMiLCJjb3VudCIsIm1ldGhvZCIsInRoZW4iLCJqc29uIiwiaGVhZGVycyIsImZldGNoIiwiYnVsa1F1ZXJ5Iiwic2VsZWN0UXVlcnkiLCJjb2x1bW5zIiwiY291bnRRdWVyeSIsImluc2VydFF1ZXJ5IiwidXBkYXRlUXVlcnkiLCIkc2V0IiwiZGVsZXRlUXVlcnkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FB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QUNKQyxTQUFLLEVBQUU7QUFBQyxnQkFBVSxFQUFYO0FBQWUsY0FBUTtBQUF2QixLQURIO0FBRUp1RCxRQUFJLEVBQUUsRUFGRjtBQUdKMUUsU0FBSyxFQUFFLEVBSEg7QUFJSnVDLGFBQVMsRUFBRTtBQUpQO0FBRlksQ0FBcEIiLCJmaWxlIjoicmEtZGF0YS1oYXN1cmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInJhLWRhdGEtaGFzdXJhXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInJhLWRhdGEtaGFzdXJhXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInJhLWRhdGEtaGFzdXJhXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHtcbiAgYnVsa1F1ZXJ5LFxuICBzZWxlY3RRdWVyeSxcbiAgY291bnRRdWVyeSxcbiAgaW5zZXJ0UXVlcnksXG4gIHVwZGF0ZVF1ZXJ5LFxuICBkZWxldGVRdWVyeVxufSBmcm9tICcuL3F1ZXJpZXMnXG5cbmNvbnN0IERFRkFVTFRfUFJJTUFSWV9LRVkgPSAnaWQnXG5cbmNvbnN0IGNsb25lUXVlcnkgPSBxdWVyeSA9PiB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHF1ZXJ5KSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgKHNlcnZlckVuZHBvaW50LCBodHRwQ2xpZW50LCBjb25maWcpID0+IHtcbiAgY29uc3QgZ2V0VGFibGVTY2hlbWEgPSByZXNvdXJjZSA9PiB7XG4gICAgbGV0IHRhYmxlTmFtZVxuICAgIGxldCBzY2hlbWFcblxuICAgIC8vIHBhcnNlIHNjaGVtYSBpbiByZXNvdXJjZVxuICAgIGlmIChyZXNvdXJjZSAmJiByZXNvdXJjZS5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgc2NoZW1hID0gJ3B1YmxpYydcbiAgICAgIHRhYmxlTmFtZSA9IHJlc291cmNlXG4gICAgfSBlbHNlIGlmIChyZXNvdXJjZSAmJiByZXNvdXJjZS5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMikge1xuICAgICAgY29uc3QgcmVzb3VyY2VTcGxpdCA9IHJlc291cmNlLnNwbGl0KCcuJylcblxuICAgICAgc2NoZW1hID0gcmVzb3VyY2VTcGxpdFswXVxuICAgICAgdGFibGVOYW1lID0gcmVzb3VyY2VTcGxpdFsxXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdJbnZhbGlkIHRhYmxlL3NjaGVtYSByZXNvdXJjZScgfSlcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHsgc2NoZW1hLCB0YWJsZU5hbWUgfVxuICB9XG5cbiAgY29uc3QgZ2V0UHJpbWFyeUtleSA9IHJlc291cmNlID0+IHtcbiAgICBsZXQgcHJpbWFyeUtleSA9IERFRkFVTFRfUFJJTUFSWV9LRVlcblxuICAgIGlmIChjb25maWcgJiYgY29uZmlnWydwcmltYXJ5S2V5J11bcmVzb3VyY2VdKSB7XG4gICAgICBwcmltYXJ5S2V5ID0gY29uZmlnWydwcmltYXJ5S2V5J11bcmVzb3VyY2VdXG4gICAgfVxuICAgIHJldHVybiBwcmltYXJ5S2V5XG4gIH1cblxuICBjb25zdCBhZGRGaWx0ZXJzID0gKHdoZXJlLCBmaWx0ZXIpID0+IHtcbiAgICBpZiAoIWZpbHRlcikgcmV0dXJuIHdoZXJlXG5cbiAgICBjb25zdCBmaWx0ZXJLZXlzID0gT2JqZWN0LmtleXMoZmlsdGVyKVxuXG4gICAgaWYgKGZpbHRlcktleXMubGVuZ3RoID09PSAwKSByZXR1cm4gd2hlcmVcblxuICAgIGNvbnN0IHdoZXJlQ29weSA9IE9iamVjdC5hc3NpZ24od2hlcmUpXG5cbiAgICBmaWx0ZXJLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHdoZXJlQ29weVtrZXldID0gZmlsdGVyW2tleV1cbiAgICB9KVxuICAgIHJldHVybiB3aGVyZUNvcHlcbiAgfVxuXG4gIGNvbnN0IGNvbnZlcnREYXRhUmVxdWVzdFRvSFRUUCA9ICh0eXBlLCByZXNvdXJjZSwgcGFyYW1zKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9XG4gICAgbGV0IGZpbmFsUXVlcnkgPSB7fVxuXG4gICAgY29uc3QgdGFibGVTY2hlbWEgPSBnZXRUYWJsZVNjaGVtYShyZXNvdXJjZSlcblxuICAgIGxldCB7IHNjaGVtYSwgdGFibGVOYW1lIH0gPSB0YWJsZVNjaGVtYVxuXG4gICAgY29uc3QgcHJpbWFyeUtleSA9IGdldFByaW1hcnlLZXkocmVzb3VyY2UpXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ0dFVF9MSVNUJzpcbiAgICAgICAgLy8gc2VsZWN0IG11bHRpcGxlXG4gICAgICAgIGNvbnN0IGZpbmFsU2VsZWN0UXVlcnkgPSBjbG9uZVF1ZXJ5KHNlbGVjdFF1ZXJ5KVxuICAgICAgICBjb25zdCBmaW5hbENvdW50UXVlcnkgPSBjbG9uZVF1ZXJ5KGNvdW50UXVlcnkpXG5cbiAgICAgICAgLy8gc21hbGwgaGFjaywgdGFrZSB0aGUgXCJxXCIgZmlsdGVyIGFuZCBtb3ZlIHRoZSB2YWx1ZSB0byB0aGUgcm9vdC5cbiAgICAgICAgaWYgKHBhcmFtcy5maWx0ZXIgJiYgcGFyYW1zLmZpbHRlci5xKSB7XG4gICAgICAgICAgY29uc3QgeyBxIH0gPSBwYXJhbXMuZmlsdGVyXG5cbiAgICAgICAgICBkZWxldGUgcGFyYW1zLmZpbHRlclsncSddXG5cbiAgICAgICAgICBwYXJhbXMuZmlsdGVyID0ge1xuICAgICAgICAgICAgLi4ucGFyYW1zLmZpbHRlcixcbiAgICAgICAgICAgIC4uLnFcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmaW5hbFNlbGVjdFF1ZXJ5LmFyZ3MudGFibGUgPSB7IG5hbWU6IHRhYmxlTmFtZSwgc2NoZW1hOiBzY2hlbWEgfVxuICAgICAgICBmaW5hbFNlbGVjdFF1ZXJ5LmFyZ3MubGltaXQgPSBwYXJhbXMucGFnaW5hdGlvbi5wZXJQYWdlXG4gICAgICAgIGZpbmFsU2VsZWN0UXVlcnkuYXJncy5vZmZzZXQgPVxuICAgICAgICAgIHBhcmFtcy5wYWdpbmF0aW9uLnBhZ2UgKiBwYXJhbXMucGFnaW5hdGlvbi5wZXJQYWdlIC1cbiAgICAgICAgICBwYXJhbXMucGFnaW5hdGlvbi5wZXJQYWdlXG4gICAgICAgIGZpbmFsU2VsZWN0UXVlcnkuYXJncy53aGVyZSA9IHBhcmFtcy5maWx0ZXJcbiAgICAgICAgZmluYWxTZWxlY3RRdWVyeS5hcmdzLm9yZGVyX2J5ID0ge1xuICAgICAgICAgIGNvbHVtbjogcGFyYW1zLnNvcnQuZmllbGQgfHwgcHJpbWFyeUtleSxcbiAgICAgICAgICB0eXBlOlxuICAgICAgICAgICAgdHlwZW9mIHBhcmFtcy5zb3J0Lm9yZGVyID09PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICA/ICdhc2MnXG4gICAgICAgICAgICAgIDogcGFyYW1zLnNvcnQub3JkZXIudG9Mb3dlckNhc2UoKVxuICAgICAgICB9XG4gICAgICAgIGZpbmFsQ291bnRRdWVyeS5hcmdzLnRhYmxlID0geyBuYW1lOiB0YWJsZU5hbWUsIHNjaGVtYTogc2NoZW1hIH1cbiAgICAgICAgZmluYWxDb3VudFF1ZXJ5LmFyZ3Mud2hlcmUgPSB7fVxuICAgICAgICBmaW5hbENvdW50UXVlcnkuYXJncy53aGVyZVtwcmltYXJ5S2V5XSA9IHsgJG5lOiBudWxsIH1cbiAgICAgICAgZmluYWxDb3VudFF1ZXJ5LmFyZ3Mud2hlcmUgPSBhZGRGaWx0ZXJzKFxuICAgICAgICAgIGZpbmFsQ291bnRRdWVyeS5hcmdzLndoZXJlLFxuICAgICAgICAgIHBhcmFtcy5maWx0ZXJcbiAgICAgICAgKVxuICAgICAgICBmaW5hbFF1ZXJ5ID0gY2xvbmVRdWVyeShidWxrUXVlcnkpXG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy5wdXNoKGZpbmFsU2VsZWN0UXVlcnkpXG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy5wdXNoKGZpbmFsQ291bnRRdWVyeSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ0dFVF9PTkUnOlxuICAgICAgICAvLyBzZWxlY3Qgb25lXG4gICAgICAgIGZpbmFsUXVlcnkgPSBjbG9uZVF1ZXJ5KHNlbGVjdFF1ZXJ5KVxuICAgICAgICBmaW5hbFF1ZXJ5LmFyZ3MudGFibGUgPSB7IG5hbWU6IHRhYmxlTmFtZSwgc2NoZW1hOiBzY2hlbWEgfVxuICAgICAgICBmaW5hbFF1ZXJ5LmFyZ3Mud2hlcmUgPSB7fVxuICAgICAgICBmaW5hbFF1ZXJ5LmFyZ3Mud2hlcmVbcHJpbWFyeUtleV0gPSB7ICRlcTogcGFyYW1zLmlkIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ0NSRUFURSc6XG4gICAgICAgIC8vIGNyZWF0ZSBvbmVcbiAgICAgICAgY29uc3QgY3JlYXRlRmllbGRzID0gT2JqZWN0LmtleXMocGFyYW1zLmRhdGEpXG5cbiAgICAgICAgZmluYWxRdWVyeSA9IGNsb25lUXVlcnkoaW5zZXJ0UXVlcnkpXG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy50YWJsZSA9IHsgbmFtZTogdGFibGVOYW1lLCBzY2hlbWE6IHNjaGVtYSB9XG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy5vYmplY3RzLnB1c2gocGFyYW1zLmRhdGEpXG4gICAgICAgIGNyZWF0ZUZpZWxkcy5wdXNoKHByaW1hcnlLZXkpXG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy5yZXR1cm5pbmcgPSBjcmVhdGVGaWVsZHNcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ1VQREFURSc6XG4gICAgICAgIC8vIHVwZGF0ZSBvbmVcbiAgICAgICAgY29uc3QgdXBkYXRlRmllbGRzID0gT2JqZWN0LmtleXMocGFyYW1zLmRhdGEpXG5cbiAgICAgICAgZmluYWxRdWVyeSA9IGNsb25lUXVlcnkodXBkYXRlUXVlcnkpXG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy50YWJsZSA9IHsgbmFtZTogdGFibGVOYW1lLCBzY2hlbWE6IHNjaGVtYSB9XG4gICAgICAgIGZpbmFsUXVlcnkuYXJnc1snJHNldCddID0gcGFyYW1zLmRhdGFcbiAgICAgICAgZmluYWxRdWVyeS5hcmdzLndoZXJlID0ge31cbiAgICAgICAgZmluYWxRdWVyeS5hcmdzLndoZXJlW3ByaW1hcnlLZXldID0geyAkZXE6IHBhcmFtcy5pZCB9XG4gICAgICAgIHVwZGF0ZUZpZWxkcy5wdXNoKHByaW1hcnlLZXkpXG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy5yZXR1cm5pbmcgPSB1cGRhdGVGaWVsZHNcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ1VQREFURV9NQU5ZJzpcbiAgICAgICAgLy8gdXBkYXRlIG11bHRpcGxlIGlkcyB3aXRoIGdpdmVuIGRhdGFcbiAgICAgICAgY29uc3QgdXBkYXRlTWFueUZpZWxkcyA9IE9iamVjdC5rZXlzKHBhcmFtcy5kYXRhKVxuXG4gICAgICAgIGZpbmFsUXVlcnkgPSBjbG9uZVF1ZXJ5KHVwZGF0ZVF1ZXJ5KVxuICAgICAgICBmaW5hbFF1ZXJ5LmFyZ3MudGFibGUgPSB7IG5hbWU6IHRhYmxlTmFtZSwgc2NoZW1hOiBzY2hlbWEgfVxuICAgICAgICBmaW5hbFF1ZXJ5LmFyZ3NbJyRzZXQnXSA9IHBhcmFtcy5kYXRhXG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy53aGVyZSA9IHt9XG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy53aGVyZVtwcmltYXJ5S2V5XSA9IHsgJGluOiBwYXJhbXMuaWRzIH1cbiAgICAgICAgdXBkYXRlTWFueUZpZWxkcy5wdXNoKHByaW1hcnlLZXkpXG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy5yZXR1cm5pbmcgPSB1cGRhdGVNYW55RmllbGRzXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdERUxFVEUnOlxuICAgICAgICAvLyBkZWxldGUgb25lXG4gICAgICAgIGNvbnN0IGRlbGV0ZUZpZWxkcyA9IE9iamVjdC5rZXlzKHBhcmFtcy5wcmV2aW91c0RhdGEpXG5cbiAgICAgICAgZmluYWxRdWVyeSA9IGNsb25lUXVlcnkoZGVsZXRlUXVlcnkpXG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy50YWJsZSA9IHsgbmFtZTogdGFibGVOYW1lLCBzY2hlbWE6IHNjaGVtYSB9XG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy53aGVyZSA9IHt9XG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy53aGVyZVtwcmltYXJ5S2V5XSA9IHsgJGVxOiBwYXJhbXMuaWQgfVxuICAgICAgICBkZWxldGVGaWVsZHMucHVzaChwcmltYXJ5S2V5KVxuICAgICAgICBmaW5hbFF1ZXJ5LmFyZ3MucmV0dXJuaW5nID0gZGVsZXRlRmllbGRzXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdERUxFVEVfTUFOWSc6XG4gICAgICAgIC8vIGRlbGV0ZSBtdWx0aXBsZVxuICAgICAgICBmaW5hbFF1ZXJ5ID0gY2xvbmVRdWVyeShkZWxldGVRdWVyeSlcbiAgICAgICAgZmluYWxRdWVyeS5hcmdzLnRhYmxlID0geyBuYW1lOiB0YWJsZU5hbWUsIHNjaGVtYTogc2NoZW1hIH1cbiAgICAgICAgZmluYWxRdWVyeS5hcmdzLndoZXJlID0ge31cbiAgICAgICAgZmluYWxRdWVyeS5hcmdzLndoZXJlW3ByaW1hcnlLZXldID0geyAkaW46IHBhcmFtcy5pZHMgfVxuICAgICAgICBmaW5hbFF1ZXJ5LmFyZ3MucmV0dXJuaW5nID0gW3ByaW1hcnlLZXldXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdHRVRfTUFOWSc6XG4gICAgICAgIC8vIHNlbGVjdCBtdWx0aXBsZSB3aXRoaW4gd2hlcmUgY2xhdXNlXG4gICAgICAgIGNvbnN0IGZpbmFsTWFueVF1ZXJ5ID0gY2xvbmVRdWVyeShzZWxlY3RRdWVyeSlcbiAgICAgICAgY29uc3QgZmluYWxNYW55Q291bnRRdWVyeSA9IGNsb25lUXVlcnkoY291bnRRdWVyeSlcblxuICAgICAgICBmaW5hbE1hbnlRdWVyeS5hcmdzLnRhYmxlID0geyBuYW1lOiB0YWJsZU5hbWUsIHNjaGVtYTogc2NoZW1hIH1cbiAgICAgICAgZmluYWxNYW55UXVlcnkuYXJncy53aGVyZSA9IHt9XG4gICAgICAgIGZpbmFsTWFueVF1ZXJ5LmFyZ3Mud2hlcmVbcHJpbWFyeUtleV0gPSB7ICRpbjogcGFyYW1zLmlkcyB9XG4gICAgICAgIGZpbmFsTWFueVF1ZXJ5LmFyZ3Mud2hlcmUgPSBhZGRGaWx0ZXJzKFxuICAgICAgICAgIGZpbmFsTWFueVF1ZXJ5LmFyZ3Mud2hlcmUsXG4gICAgICAgICAgcGFyYW1zLmZpbHRlclxuICAgICAgICApXG5cbiAgICAgICAgZmluYWxNYW55Q291bnRRdWVyeS5hcmdzLnRhYmxlID0geyBuYW1lOiB0YWJsZU5hbWUsIHNjaGVtYTogc2NoZW1hIH1cbiAgICAgICAgZmluYWxNYW55Q291bnRRdWVyeS5hcmdzLndoZXJlID0ge31cbiAgICAgICAgZmluYWxNYW55Q291bnRRdWVyeS5hcmdzLndoZXJlW3ByaW1hcnlLZXldID0geyAkbmU6IG51bGwgfVxuICAgICAgICBmaW5hbE1hbnlDb3VudFF1ZXJ5LmFyZ3Mud2hlcmUgPSBhZGRGaWx0ZXJzKFxuICAgICAgICAgIGZpbmFsTWFueUNvdW50UXVlcnkuYXJncy53aGVyZSxcbiAgICAgICAgICBwYXJhbXMuZmlsdGVyXG4gICAgICAgIClcblxuICAgICAgICBmaW5hbFF1ZXJ5ID0gY2xvbmVRdWVyeShidWxrUXVlcnkpXG4gICAgICAgIGZpbmFsUXVlcnkuYXJncy5wdXNoKGZpbmFsTWFueVF1ZXJ5KVxuICAgICAgICBmaW5hbFF1ZXJ5LmFyZ3MucHVzaChmaW5hbE1hbnlDb3VudFF1ZXJ5KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnR0VUX01BTllfUkVGRVJFTkNFJzpcbiAgICAgICAgLy8gc2VsZWN0IG11bHRpcGxlIHdpdGggcmVsYXRpb25zXG4gICAgICAgIGNvbnN0IGZpbmFsTWFueVJlZlF1ZXJ5ID0gY2xvbmVRdWVyeShzZWxlY3RRdWVyeSlcbiAgICAgICAgY29uc3QgZmluYWxNYW55UmVmQ291bnRRdWVyeSA9IGNsb25lUXVlcnkoY291bnRRdWVyeSlcblxuICAgICAgICBmaW5hbE1hbnlSZWZRdWVyeS5hcmdzLnRhYmxlID0geyBuYW1lOiB0YWJsZU5hbWUsIHNjaGVtYTogc2NoZW1hIH1cbiAgICAgICAgZmluYWxNYW55UmVmUXVlcnkuYXJncy5saW1pdCA9IHBhcmFtcy5wYWdpbmF0aW9uLnBlclBhZ2VcbiAgICAgICAgZmluYWxNYW55UmVmUXVlcnkuYXJncy5vZmZzZXQgPVxuICAgICAgICAgIHBhcmFtcy5wYWdpbmF0aW9uLnBhZ2UgKiBwYXJhbXMucGFnaW5hdGlvbi5wZXJQYWdlIC1cbiAgICAgICAgICBwYXJhbXMucGFnaW5hdGlvbi5wZXJQYWdlXG4gICAgICAgIGZpbmFsTWFueVJlZlF1ZXJ5LmFyZ3Mud2hlcmUgPSB7IFtwYXJhbXMudGFyZ2V0XTogcGFyYW1zLmlkIH1cbiAgICAgICAgZmluYWxNYW55UmVmUXVlcnkuYXJncy53aGVyZSA9IGFkZEZpbHRlcnMoXG4gICAgICAgICAgZmluYWxNYW55UmVmUXVlcnkuYXJncy53aGVyZSxcbiAgICAgICAgICBwYXJhbXMuZmlsdGVyXG4gICAgICAgIClcbiAgICAgICAgZmluYWxNYW55UmVmUXVlcnkuYXJncy5vcmRlcl9ieSA9IHtcbiAgICAgICAgICBjb2x1bW46IHBhcmFtcy5zb3J0LmZpZWxkIHx8IHByaW1hcnlLZXksXG4gICAgICAgICAgdHlwZTpcbiAgICAgICAgICAgIHR5cGVvZiBwYXJhbXMuc29ydC5vcmRlciA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgPyAnYXNjJ1xuICAgICAgICAgICAgICA6IHBhcmFtcy5zb3J0Lm9yZGVyLnRvTG93ZXJDYXNlKClcbiAgICAgICAgfVxuICAgICAgICBmaW5hbE1hbnlSZWZDb3VudFF1ZXJ5LmFyZ3MudGFibGUgPSB7IG5hbWU6IHRhYmxlTmFtZSwgc2NoZW1hOiBzY2hlbWEgfVxuICAgICAgICBmaW5hbE1hbnlSZWZDb3VudFF1ZXJ5LmFyZ3Mud2hlcmUgPSB7fVxuICAgICAgICBmaW5hbE1hbnlSZWZDb3VudFF1ZXJ5LmFyZ3Mud2hlcmVbcHJpbWFyeUtleV0gPSB7ICRuZTogbnVsbCB9XG4gICAgICAgIGZpbmFsTWFueVJlZkNvdW50UXVlcnkuYXJncy53aGVyZSA9IGFkZEZpbHRlcnMoXG4gICAgICAgICAgZmluYWxNYW55UmVmUXVlcnkuYXJncy53aGVyZSxcbiAgICAgICAgICBwYXJhbXMuZmlsdGVyXG4gICAgICAgIClcbiAgICAgICAgZmluYWxRdWVyeSA9IGNsb25lUXVlcnkoYnVsa1F1ZXJ5KVxuICAgICAgICBmaW5hbFF1ZXJ5LmFyZ3MucHVzaChmaW5hbE1hbnlSZWZRdWVyeSlcbiAgICAgICAgZmluYWxRdWVyeS5hcmdzLnB1c2goZmluYWxNYW55UmVmQ291bnRRdWVyeSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgdHlwZSAke3R5cGV9YClcbiAgICB9XG4gICAgb3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoZmluYWxRdWVyeSlcbiAgICByZXR1cm4geyBvcHRpb25zIH1cbiAgfVxuXG4gIGNvbnN0IGNvbnZlcnRIVFRQUmVzcG9uc2UgPSAocmVzcG9uc2UsIHR5cGUsIHJlc291cmNlLCBwYXJhbXMpID0+IHtcbiAgICAvLyBoYW5kbGUgZXJyb3JzIGFuZCB0aHJvdyB3aXRoIHRoZSBtZXNzYWdlXG4gICAgaWYgKCdlcnJvcicgaW4gcmVzcG9uc2UgfHwgJ2NvZGUnIGluIHJlc3BvbnNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKVxuICAgIH1cbiAgICBjb25zdCBwcmltYXJ5S2V5ID0gZ2V0UHJpbWFyeUtleShyZXNvdXJjZSlcblxuICAgIGlmIChwcmltYXJ5S2V5ICE9PSBERUZBVUxUX1BSSU1BUllfS0VZKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNwb25zZVswXSkpIHtcbiAgICAgICAgcmVzcG9uc2VbMF0uZm9yRWFjaChyZXMgPT4ge1xuICAgICAgICAgIHJlc1tERUZBVUxUX1BSSU1BUllfS0VZXSA9IHJlc1twcmltYXJ5S2V5XVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzcG9uc2VbMF1bREVGQVVMVF9QUklNQVJZX0tFWV0gPSByZXNwb25zZVswXVtwcmltYXJ5S2V5XVxuICAgICAgfVxuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ0dFVF9MSVNUJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkYXRhOiByZXNwb25zZVswXSxcbiAgICAgICAgICB0b3RhbDogcmVzcG9uc2VbMV1bJ2NvdW50J11cbiAgICAgICAgfVxuICAgICAgY2FzZSAnR0VUX09ORSc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGF0YTogcmVzcG9uc2VbMF1cbiAgICAgICAgfVxuICAgICAgY2FzZSAnQ1JFQVRFJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkYXRhOiByZXNwb25zZS5yZXR1cm5pbmdbMF1cbiAgICAgICAgfVxuICAgICAgY2FzZSAnVVBEQVRFJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkYXRhOiByZXNwb25zZS5yZXR1cm5pbmdbMF1cbiAgICAgICAgfVxuICAgICAgY2FzZSAnVVBEQVRFX01BTlknOlxuICAgICAgICBjb25zdCB1cGRhdGVkSWRzID0gcmVzcG9uc2UucmV0dXJuaW5nLm1hcChpdGVtID0+IHtcbiAgICAgICAgICByZXR1cm4gaXRlbS5pZFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGF0YTogdXBkYXRlZElkc1xuICAgICAgICB9XG4gICAgICBjYXNlICdERUxFVEUnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRhdGE6IHJlc3BvbnNlLnJldHVybmluZ1swXVxuICAgICAgICB9XG4gICAgICBjYXNlICdERUxFVEVfTUFOWSc6XG4gICAgICAgIGNvbnN0IGRlbGV0ZWRJZHMgPSByZXNwb25zZS5yZXR1cm5pbmcubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIHJldHVybiBpdGVtLmlkXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkYXRhOiBkZWxldGVkSWRzXG4gICAgICAgIH1cbiAgICAgIGNhc2UgJ0dFVF9NQU5ZJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkYXRhOiByZXNwb25zZVswXVxuICAgICAgICB9XG4gICAgICBjYXNlICdHRVRfTUFOWV9SRUZFUkVOQ0UnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRhdGE6IHJlc3BvbnNlWzBdLFxuICAgICAgICAgIHRvdGFsOiByZXNwb25zZVsxXS5jb3VudFxuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geyBkYXRhOiByZXNwb25zZSB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICh0eXBlLCByZXNvdXJjZSwgcGFyYW1zKSA9PiB7XG4gICAgY29uc3QgeyBvcHRpb25zIH0gPSBjb252ZXJ0RGF0YVJlcXVlc3RUb0hUVFAodHlwZSwgcmVzb3VyY2UsIHBhcmFtcylcblxuICAgIG9wdGlvbnMubWV0aG9kID0gJ1BPU1QnXG4gICAgaWYgKHR5cGVvZiBodHRwQ2xpZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBzdXBwb3J0IGh0dHBDbGllbnQgYXJndW1lbnRcbiAgICAgIHJldHVybiBodHRwQ2xpZW50KHNlcnZlckVuZHBvaW50ICsgJy92MS9xdWVyeScsIG9wdGlvbnMpLnRoZW4ocmVzcG9uc2UgPT5cbiAgICAgICAgY29udmVydEhUVFBSZXNwb25zZShyZXNwb25zZS5qc29uLCB0eXBlLCByZXNvdXJjZSwgcGFyYW1zKVxuICAgICAgKVxuICAgIH1cblxuICAgIG9wdGlvbnMuaGVhZGVycyA9IGh0dHBDbGllbnQgLy8gYmFja3dhcmRzIGNvbXBhdGlibGUgc3RhdGljIGhlYWRlciBvYmplY3RcbiAgICByZXR1cm4gZmV0Y2goc2VydmVyRW5kcG9pbnQgKyAnL3YxL3F1ZXJ5Jywgb3B0aW9ucykudGhlbihmdW5jdGlvbihcbiAgICAgIHJlc3BvbnNlXG4gICAgKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIHJldHVybiBjb252ZXJ0SFRUUFJlc3BvbnNlKGRhdGEsIHR5cGUsIHJlc291cmNlLCBwYXJhbXMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbiIsIi8vIGRlZmluZSBoYXN1cmEganNvbiBhcGkgcXVlcmllc1xuY29uc3QgYnVsa1F1ZXJ5ID0ge1xuICB0eXBlOiAnYnVsaycsXG4gIGFyZ3M6IFtdXG59O1xuXG5jb25zdCBzZWxlY3RRdWVyeSA9IHtcbiAgdHlwZTogJ3NlbGVjdCcsXG4gIGFyZ3M6IHtcbiAgICB0YWJsZTogeydzY2hlbWEnOiAnJywgJ25hbWUnOiAnJ30sXG4gICAgY29sdW1uczogWycqJ11cbiAgfVxufTtcblxuY29uc3QgY291bnRRdWVyeSA9IHtcbiAgdHlwZTogJ2NvdW50JyxcbiAgYXJnczoge1xuICAgIHRhYmxlOiB7J3NjaGVtYSc6ICcnLCAnbmFtZSc6ICcnfSxcbiAgICB3aGVyZToge31cbiAgfVxufTtcblxuY29uc3QgaW5zZXJ0UXVlcnkgPSB7XG4gIHR5cGU6ICdpbnNlcnQnLFxuICBhcmdzOiB7XG4gICAgdGFibGU6IHsnc2NoZW1hJzogJycsICduYW1lJzogJyd9LFxuICAgIG9iamVjdHM6IFtdLFxuICAgIHJldHVybmluZzogW11cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlUXVlcnkgPSB7XG4gIHR5cGU6ICd1cGRhdGUnLFxuICBhcmdzOiB7XG4gICAgdGFibGU6IHsnc2NoZW1hJzogJycsICduYW1lJzogJyd9LFxuICAgICRzZXQ6IHt9LFxuICAgIHdoZXJlOiB7fSxcbiAgICByZXR1cm5pbmc6IFtdXG4gIH1cbn07XG5cbmNvbnN0IGRlbGV0ZVF1ZXJ5ID0ge1xuICB0eXBlOiAnZGVsZXRlJyxcbiAgYXJnczoge1xuICAgIHRhYmxlOiB7J3NjaGVtYSc6ICcnLCAnbmFtZSc6ICcnfSxcbiAgICAkc2V0OiB7fSxcbiAgICB3aGVyZToge30sXG4gICAgcmV0dXJuaW5nOiBbXVxuICB9XG59O1xuXG5leHBvcnQgeyBidWxrUXVlcnksIHNlbGVjdFF1ZXJ5LCBjb3VudFF1ZXJ5LCBpbnNlcnRRdWVyeSwgdXBkYXRlUXVlcnksIGRlbGV0ZVF1ZXJ5IH07XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=