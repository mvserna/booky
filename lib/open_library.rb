require 'uri'
require 'faraday'
require 'json'

module OpenLibrary
  OPEN_LIBRARY_URL = "https://openlibrary.org/"
  
  def get(key)
    url = URI.parse("#{OPEN_LIBRARY_URL}#{key}.json")
    response = Faraday.get(url)
    JSON.parse(response.body)
  end

  module_function :get
end