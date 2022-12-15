
class QuotesResponse {
  constructor(quotes, message = undefined) {
    this.quotes = quotes;
    this.total_received = quotes.length;
    this.message = message;
  }
}

module.exports = QuotesResponse