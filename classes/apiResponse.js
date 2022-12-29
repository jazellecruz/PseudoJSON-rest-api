
class ApiResponse {
  constructor(data, name, page = 1, limit = 0) {
    this.message = "Successfully fullfilled request!";
    this[name] = data;
    this.total_received = data.length;
    this.page = page;
    this.limit = limit
  }
}

module.exports = ApiResponse