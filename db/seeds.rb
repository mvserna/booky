# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create(email: "test@test.com", encrypted_password: "testing", password: "testing")

for i in 0..9 do
  book = Book.retrieve("books/OL735461#{i}M")
  book.users << user
  book.save
end