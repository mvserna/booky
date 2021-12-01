require_relative './work'

class Edition
  attr_reader :title, :isbn, :open_library_edition_key, :open_library_works_key, :publish_date, :first_sentence, :body, :covers, :description
  
  def initialize(book_key)
    if !book_key.include?("books/")
      book_key = "books/#{book_key}"
    end
    @body = OpenLibrary.get(book_key)
    @open_library_edition_key = body["key"] 
    @title = body["title"]
    if body["isbn_13"].first
      @isbn = body["isbn_13"].first
    else
      @isbn = body["isbn_10"].first
    end
    @publish_date = body["publish_date"]
    if body["works"].first
      @open_library_works_key = body["works"].first["key"]
    end
    if body["first_sentence"]
      @first_sentence = body["first_sentence"]["value"]
    end
    if body["covers"]
      @covers = body["covers"]
    else
      @covers = []
    end
    if body["description"]
      @description = body["description"]["value"]
    end
  end

  def self.isbn(isbn)
    response = Faraday.get("https://openlibrary.org/isbn/#{isbn}.json")
    redirect = response.headers["location"]
    book_key = redirect.match( /OL\w+(?=\.)/ )[0]
    OpenLibrary::Edition.new(book_key)
  end

  def author
    response = Faraday.get("https://openlibrary.org#{body["authors"].first["key"]}.json")
    body = JSON.parse(response.body)
    body["name"]
  end
end