
class ApiResponse {
  constructor(result, name, page = 1, limit = 0) {
    this.message = "Successfully fullfilled request!";
    this[name] = result;
    this.total_received = quotes.length;
    this.page = page;
    this.limit = limit
  }
}

module.exports = ApiResponse