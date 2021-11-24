class Book < ApplicationRecord
  def index
  end

  def self.retrieve(edition_key)
    edition = OpenLibrary::Edition.new(edition_key)
    book = Book.new(
      title: edition.title,
      author: edition.author,
      isbn: edition.isbn,
      publish_date: edition.publish_date,
      first_sentence: edition.first_sentence,
      edition_key: edition.open_library_edition_key,
      works_key: edition.open_library_works_key
    )
  end

end