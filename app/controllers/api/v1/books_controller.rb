class Api::V1::BooksController < ApplicationController
  def index
    render json: current_user.books.order(updated_at: :DESC)
  end

  def create
    already_exists = Book.find_by("edition_key = ?", params["book_key"])
    if already_exists
      book = already_exists
      book.touch
    else
      book = Book.retrieve(params["book_key"])
    end
    book.users << current_user
    book.author = params["authors"]
    book.save
    render json: current_user.books.order(updated_at: :DESC)
  end
end