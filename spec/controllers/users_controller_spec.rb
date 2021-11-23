require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do 
  describe "GET#index" do
    let!(:test_user) { FactoryBot.create(:user)}
    
    it "should return false when the user is not signed in" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json; charset=utf-8")

      expect(returned_json["authenticated"]).to eq false
    end

    it "should return true when the user is signed in" do
      sign_in test_user

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json; charset=utf-8")

      expect(returned_json["authenticated"]).to eq true
    end
  end
end