require 'pry'
require 'Faraday'

class Api::V1::WorksController < ApplicationController

  def show
    response = Faraday.get("http://openlibrary.org/works/#{params[:id]}.json")
    body = JSON.parse(response.body)
    work = {
      title: "Howdy"
    }
    binding.pry
    render json: work
  end
end