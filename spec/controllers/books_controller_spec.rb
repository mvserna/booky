require "rails_helper"

RSpec.describe Api::V1::BooksController, type: :controller do 
  describe "GET#index" do
    let!(:test_user) { create(:user) }
    let!(:owned_books) { create_list(:book, 5, users: [test_user]) }
    let!(:unowned_books) { create_list(:book, 4) }
    
    it "should return the user's books" do
      sign_in test_user

      get :index
      returned_json = JSON.parse(response.body)
      returned_books = returned_json["books"]

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json; charset=utf-8")
      
      expect(returned_books.length).to eq 5
      expect(returned_books.last["id"]).to eq owned_books.last["id"]
    end

    it "should not return other books" do
      sign_in test_user

      get :index
      returned_json = JSON.parse(response.body)
      returned_books = returned_json["books"]

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json; charset=utf-8")

      expect(returned_books.length).to_not eq unowned_books.length
      expect(returned_books.last["id"]).to_not eq unowned_books.last["id"]
    end
  end
end