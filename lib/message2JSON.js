const { assert } = require('console');
const path = require('path');
const field2JSON = require('./field2JSON');

function message2JSON(proto, opts) {
  const { fields, comment: description } = proto;
  let required = [];
  const properties = Object.values(fields).reduce((ret, field) => {
    const key = field.name.startsWith('.') ? field.name.slice(field.name.lastIndexOf('.') + 1) : field.name;
    if (!field.optional || field.required) {
      required.push(key);
    }
    return {
      ...ret,
      [key]: field2JSON(field, opts),
    };
  }, {});
  const ret = {
    type: 'object',
    properties,
  };
  if (required.length) {
    ret.required = required;
  }
  if (description) {
    ret.description = description;
  }
  return ret;
}
module.exports = message2JSON;
