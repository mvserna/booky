require 'uri'
require 'faraday'
require 'json'

require_relative './open_library'

class OpenLibrary::Search
  attr_reader :parsed_response, :num_found, :results

  def initialize(query_string)
    url = URI.parse("#{OPEN_LIBRARY_URL}search.json?q=#{query_string}&page=1")
    @response = Faraday.get(url)
    @parsed_response = JSON.parse(@response.body)
    @num_found = parsed_response["numFound"]
    @results = parsed_response["docs"]
  end

  def works
    works = []
    results.each { |result| works << OpenLibrary::Work.new(result) }
    works
  end

end