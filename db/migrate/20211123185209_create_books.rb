class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :author
      t.string :isbn, null: false
      t.string :publish_date
      t.string :first_sentence
      t.string :edition_key
      t.string :works_key
      t.string :cover
      t.text :description

      t.timestamps
    end
  end
end
