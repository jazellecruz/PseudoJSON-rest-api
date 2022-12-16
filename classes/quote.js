
class QuotesResponse {
  constructor(quotes, message = undefined, limit = 0, page = 0) {
    this.quotes = quotes;
    this.total_received = quotes.length;
    this.message = message;
    this.page = page;
    this.limit = limit
  }
}

module.exports = QuotesResponse