require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :book do
    sequence(:title) { |n| "Test Book #{n}" }
    sequence(:author) { |n| "John Doe #{n}" }
    sequence(:isbn) { |n| "100000000000#{n}" }
    description { "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod ratione impedit temporibus maiores autem aperiam assumenda exercitationem, quisquam nobis esse." }
  end
end
