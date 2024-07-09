FactoryBot.define do
  factory :otp do
    user { nil }
    code { 'MyString' }
    expires_at { '2024-07-06 12:26:10' }
  end
end
