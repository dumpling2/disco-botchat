function requestStr(Str) {
    return Str.substring(Str.indexOf(">") + 1, Str.length);
  }
  
  module.exports = requestStr;