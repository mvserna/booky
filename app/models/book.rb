class Book < ApplicationRecord
  has_many :shelvings
  has_many :users, through: :shelvings
  
  def self.retrieve(edition_key)
    edition = OpenLibrary::Edition.new(edition_key)
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