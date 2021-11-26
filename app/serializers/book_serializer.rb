class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :isbn, :publish_date, :cover, :description
end
