class Api::V1::BooksController < ApplicationController
  def index
    render json: current_user.books
  end
end