# frozen_string_literal: true

class User < ApplicationRecord
  has_one :otp, dependent: :destroy
  has_secure_password
  has_one_attached :image

  validates :last_name, presence: true
  validates :first_name, presence: true
  validates :phone, presence: true

  enum role: { customer: 0, admin: 1 }
  after_initialize :set_user_role, if: :new_record?

  def set_user_role
    role || :customer
  end

  def reached_max_attempts_limit?
    failed_attempts > 7
  end

  def full_name
    "#{last_name} #{first_name}"
  end

  def confirmed?
    !confirmed_at.nil?
  end
end
