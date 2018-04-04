class Book
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  include Mongoid::Timestamps
  # include PublicActivity::Model

  field :name, type: String 
  belongs_to :user
end
