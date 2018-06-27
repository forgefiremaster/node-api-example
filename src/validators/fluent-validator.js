'use-strict'

//Estes validadores servem de contrato para validar o body das requisiçoes http

let errors = [];

function ValidationContract(){
  errors = [];
}

ValidationContract.prototype.isRequired = (values, message) => {
  if (!values || value.lenght <= 0) {
      errors.push({message : message});
  }
}

  ValidationContract.prototype.hasMinLen = (values, min, message) => {
    if (!values || values.lenght < min) {
      errors.push({message : message});
    }
  }

  ValidationContract.prototype.hasMaxLen = (values, max, message) => {
    if (!values || values.lenght > max) {
      errors.push({message : message});
    }
  }

  ValidationContract.prototype.isFixedLen = (values, len, message) => {
    if (values.lenght != len) {
      errors.push({message : message});
    }
  }

  ValidationContract.prototype.isEmail = (values, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+) * @\w+([-.]\w)*\.\w+([-.]\w)*$/)
    if (reg.test(value)) {
      errors.push({message : message});
    }
  }

ValidationContract.prototype.errors = () => {
  return errors;
}

ValidationContract.prototype.clear = () => {
  errors = [];
}

ValidationContract.prototype.isValid = () => {
  return errors.lenght == 0;
}

module.exports = ValidationContract;
