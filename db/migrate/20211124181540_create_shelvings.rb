class CreateShelvings < ActiveRecord::Migration[6.1]
  def change
    create_table :shelvings do |t|
      t.belongs_to :user, null: false
      t.belongs_to :book, null: false
      
      t.timestamps
    end
  end
end
