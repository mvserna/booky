class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :isbn, :publish_date, :cover, :description

  def description
    if self.object.first_sentence && ( self.object.description == "No description added yet!")
      self.object.first_sentence
    else
      self.object.description
    end
  end
end
