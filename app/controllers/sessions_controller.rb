# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    auth = request.env['omniauth.auth']
    user = User.find_or_create_by(provider: auth.provider, uid: auth.uid) do |u|
      u.full_name = auth.info.full_name
      u.email = auth.info.email
    end
    session[:user_id] = user.id
    redirect_to root_path
  end
end
