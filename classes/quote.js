
class QuotesResponse {
  constructor(quotes) {
    this.quotes = quotes;
    this.total_received = quotes.length;
  }
}

module.exports = QuotesResponse