class Api::V1::UsersController < ApplicationController
  def index
    render json: {authenticated: authenticated}
  end

  def authenticated
    if current_user
      true
    else
      false
    end
  end
end