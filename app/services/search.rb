require 'uri'
require 'faraday'
require 'json'

require_relative './open_library'

class Search
  include OpenLibrary
  
  attr_reader :parsed_response, :num_found, :results

  def initialize(query_string)
    url = URI.parse("#{OPEN_LIBRARY_URL}search.json?q=#{query_string}&page=1")
    @response = Faraday.get(url)
    @parsed_response = JSON.parse(@response.body)
    @num_found = parsed_response["numFound"]
    @results = parsed_response["docs"]
  end

  def books
    results.map { |result| 
      Book.new(
        title: result.title,
        author: result.author,
        isbn: result.isbn,
        publish_date: result.publish_date,
        first_sentence: result.first_sentence,
        edition_key: result.open_library_edition_key,
        works_key: result.open_library_works_key,
        cover: result.covers.first,
        description: result.description
      )
    }
  end

end