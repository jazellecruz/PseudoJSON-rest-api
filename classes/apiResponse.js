
class ApiResponse {
  constructor(data, name, total, page = 1, limit = 0) {
    this.message = "Successfully fullfilled request!";
    this[name] = data;
    this.total_found = total;
    this.total_received = data.length;
    this.page = Number(page);
    this.limit = Number(limit)
  }
}

module.exports = ApiResponse