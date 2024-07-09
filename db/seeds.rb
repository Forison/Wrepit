# frozen_string_literal: true

User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  email: Faker::Internet.email,
  password: Faker::Internet.password,
  phone: Faker::PhoneNumber.phone_number_with_country_code,
  role: 'admin'
)
