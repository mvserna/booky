class Api::V1::BooksController < ApplicationController
  def index
    render json: Book.all
  end
end