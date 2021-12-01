class Api::V1::BooksController < ApplicationController
  def index
    render json: current_user.books.order(updated_at: :DESC)
  end

  def create
    book = Book.retrieve(params["book_key"])
    book.users << current_user
    already_exists = Book.find_by("edition_key = ?", book.edition_key)
    if already_exists
      book = already_exists
    else
      book.save
    end
    render json: book
  end
end