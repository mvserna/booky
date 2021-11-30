# require_relative "../../../services/open_library.rb"
# require_relative "../../../services/search.rb"

class Api::V1::SearchController < ApplicationController
  def create
        
    search = Search.new(params["query_string"])
    results = search.results.take(25)
    results.map! do |work|
      {
      title: work["title"],
      cover: work["cover_i"]
      }
    end

    render json: results
  end
end