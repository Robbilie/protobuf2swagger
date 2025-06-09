function bakeRef(root, name, parent) {
  let type;
  if (parent) {
    try {
      type = parent.lookup(name);
    } catch (e) {}
  }
  if (!type) {
    try {
      type = root.lookup(name);
    } catch (e) {}
  }
  if (type) {
    return {
      $ref: `#/definitions/${type.fullName.slice(1)}`,
    };
  }
  return {};
}

module.exports = bakeRef;
