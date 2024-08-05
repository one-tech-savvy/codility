const typeCheck = (obj) => {
  const validateType = (prop, value) => {
    const type = prop.split('_').pop();
    const kv = `${prop}: ${value}`;
    switch (type) {
      case 'string':
        if (typeof value !== 'string') throw new Error(`Invalid type for ${kv}`);
        break;
      case 'int':
        if (!Number.isInteger(value)) throw new Error(`Invalid type for ${kv}`);
        break;
      case 'float':
        if (typeof value !== 'number' || Number.isInteger(value)) throw new Error(`Invalid type for ${kv}`);
        break;
      case 'number':
        if (typeof value !== 'number') throw new Error(`Invalid type for ${kv}`);
        break;
      case 'bool':
        if (typeof value !== 'boolean') throw new Error(`Invalid type for ${kv}`);
        break;
      default:
        break;
    }
  };

  // Validate initial object properties
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      validateType(prop, obj[prop]);
    }
  }

  const handler = {
    set(target, prop, value) {
      validateType(prop, value);
      target[prop] = value;
      return true;
    }
  };

  return new Proxy(obj, handler);
};

// Example Usage
const obj = {
  age_int: 2,
  name_string: "Adam",
  job: null,
}
const validatingObject = typeCheck(obj);
try {
  validatingObject.age_int = 2.25; // Throws error
} catch (e) {
  console.error(e.message);
}
try {
  validatingObject.age_float = 2.25; // Throws error
} catch (e) {
  console.error(e.message);
}
validatingObject.age_int = 2;
validatingObject.job = "fireman";
try {
  validatingObject.address_string = 20; // Throws error
} catch (e) {
  console.error(e.message);
}

const obj_2 = {
  employed_bool: "true",
}
try {
  const validatingObject2 = typeCheck(obj_2); // Throws error
} catch (e) {
  console.error(e.message);
}