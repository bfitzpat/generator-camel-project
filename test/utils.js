/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
var path = require('path');
const chalk = require('chalk');
const utils = require('../app/util');
var assert = require('yeoman-assert');

describe('Should test the utils class package validation', function () {
    it('utilities package validation should work for valid package', function () {
      assert.strictEqual(utils.validatePackage('com.valid'), true);
    });
    it('utilities package validation should fail for package name with invalid characters', function () {
      assert.notStrictEqual(utils.validatePackage('invalid@.pkg.name'), true);
    });
    it('utilities package validation should fail for package name with java keyword', function () {
      assert.notStrictEqual(utils.validatePackage('a.name.with.package'), true);
    });
});

describe('Should test the utils class Wsdl2Rest jar finding', function () {
     it('utilities findWsdl2RestJar should succeed in finding wsdl2rest jar', function () {
       // test runs on its own but fails in the larger test suite - still figuring that out
      var targetDir = path.join(__dirname, '../app/wsdl2rest/target');
      var jar = utils.findWsdl2RestJar(targetDir);
      assert.notStrictEqual(jar, null);
      console.log(`jar: ${jar}`);
      assert.strictEqual(jar.includes('wsdl2rest-impl-fatjar-'), true);
      assert.strictEqual(jar.endsWith('.jar'), true);
      assert.notStrictEqual(jar.endsWith('.original'), true);
     });
});

describe('Should test the utils Camel DSL validation', function () {
    it('allows Spring for non wsdl2rest', function () {
      assert.strictEqual(utils.validateCamelDSL('spring', false), true);
    });
    it('allows Spring for wsdl2rest', function () {
        assert.strictEqual(utils.validateCamelDSL('spring', true), true);
      });
    it('allows Blueprint for non wsdl2rest', function () {
        assert.strictEqual(utils.validateCamelDSL('blueprint', false), true);
    });
    it('allows Blueprint for wsdl2rest', function () {
        assert.strictEqual(utils.validateCamelDSL('blueprint', true), true);
    });
    it('allows Java for non wsdl2rest', function () {
        assert.strictEqual(utils.validateCamelDSL('java', false), true);
    });
    it('does not allow Java for wsdl2rest', function () {
        assert.strictEqual(utils.validateCamelDSL('java', true), chalk.red('When using wsdl2rest, the Camel DSL must be either \'spring\' or \'blueprint\'.'));
    });
});
