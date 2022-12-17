
class QuotesResponse {
  constructor(quotes, page = 1, limit = 0) {
    this.message = "Successfully fullfilled request!";
    this.quotes = quotes;
    this.total_received = quotes.length;
    this.page = page;
    this.limit = limit
  }
}

module.exports = QuotesResponse