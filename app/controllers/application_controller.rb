# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit::Authorization
  public :policy_scope
  public :authorize

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end
end
