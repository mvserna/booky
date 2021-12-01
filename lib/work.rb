require_relative './search'

class OpenLibrary::Work
  attr_reader :key, :title, :editions, :books, :isbns, :cover, :author

  def initialize(work)
      @key = work["key"] 
      @title = work["title"]
      @editions = work["edition_key"]
      @isbns = work["isbn"]
      @cover = { key: work["cover_edition_key"], image: work["cover_i"] }
      @author = { key: work["author_key"], name: work["author_name"] }
  end

  def books
    editions.map { |edition| OpenLibrary::Edition.new(edition) }
  end

  def image
    cover[:image]
  end
  
end
