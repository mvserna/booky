class Api::V1::SearchController < ApplicationController
  def create
    # isbn = params["query_string"].match( /[0-9]{10,13}/ )[0]
    search = Search.new(params["query_string"])
    results = search.results.take(24)
    results.map! do |work|
      {
      key: work["key"].match( /OL\w+/ )[0],
      title: work["title"],
      authors: work["author_name"],
      cover: work["cover_i"]
      }
    end

    render json: results
  end

  def show
    search = Search.new(params["id"])
    edition_keys = search.results.first["seed"].take(8)
    editions = []
    edition_keys.each do |edition_key|
      puts editions
      if !edition_key.include?("books")
        break
      end

      puts edition_key
      edition_key = edition_key.match( /OL\w+/ )[0]

      book_response = Faraday.get("https://openlibrary.org/books/#{edition_key}.json")
      if book_response.status == 301 || book_response.status == 302 || book_response.status == 303
        redirect = book_response.headers["location"]
        book_key = redirect.match( /OL\w+/ )[0]
        editions << Edition.new(book_key)
      elsif response.status == 203 || response.status == 200
        editions << Edition.new(edition_key)
      end

    end
    render json: editions
  end
end