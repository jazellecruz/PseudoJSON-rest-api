
class ApiResponse {
  constructor(quotes, name, page = 1, limit = 0) {
    this.message = "Successfully fullfilled request!";
    this[name] = quotes;
    this.total_received = quotes.length;
    this.page = page;
    this.limit = limit
  }
}

module.exports = ApiResponse