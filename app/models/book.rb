class Book < ApplicationRecord
  has_many :shelvings
  has_many :users, through: :shelvings
  
  def self.retrieve(edition_key)
    edition = "Nothing"
    edition_key = edition_key.match( /OL\w+/ )[0]
    response = Faraday.get("https://openlibrary.org/books/#{edition_key}.json")
    if response.status == 303
      redirect = response.headers["location"]
      book_key = redirect.match( /OL\w+/ )[0]
      edition = Edition.new(book_key)
    elsif response.status == 203 || response.status == 200
      edition = Edition.new(edition_key)
    end
    book = Book.new(
      title: edition.title,
      author: edition.author,
      isbn: edition.isbn,
      publish_date: edition.publish_date,
      first_sentence: edition.first_sentence,
      edition_key: edition.open_library_edition_key,
      works_key: edition.open_library_works_key,
      cover: edition.covers.first,
      description: edition.description
    )
  end

end