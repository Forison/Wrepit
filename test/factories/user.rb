# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name  { Faker::Name.last_name }
    email { Faker::Internet.email }
    password { Faker::Internet.password }
    phone { Faker::PhoneNumber.phone_number_with_country_code }

    trait :with_unconfirmed_user do
      unconfirmed_email { Faker::Internet.email }
      confirmation_token { Jwt::Encoder.new(unconfirmed_email).call }
      confirmation_sent_at { Time.zone.now }
    end

    trait :with_confirmed_user do
      email { Faker::Internet.email }
      confirmed_at { Time.zone.now }
    end

    trait :with_unlock_user_token do
      email { Faker::Internet.email }
      unlock_token { Jwt::Encoder.new(email).call }
    end

    trait :with_reset_password_token do
      email { Faker::Internet.email }
      reset_password_token { Jwt::Encoder.new(email).call }
      confirmation_sent_at { Time.zone.now }
    end
    trait :with_image_attached do
      image { Faker::LoremFlickr.image }
    end
  end
end
