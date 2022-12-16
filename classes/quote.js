
class QuotesResponse {
  constructor(quotes, message = undefined, page = 1, limit = 0) {
    this.quotes = quotes;
    this.total_received = quotes.length;
    this.message = message;
    this.page = page + 1;
    this.limit = limit
  }
}

module.exports = QuotesResponse