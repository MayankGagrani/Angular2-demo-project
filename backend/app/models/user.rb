class User
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  include Mongoid::Timestamps

  field :first_name, type: String, default: ""
  field :last_name, type: String, default: ""
  field :user_name, type: String
  field :sex, type: Boolean, default: "M"
  # field :date_of_birth, 
  field :email, type: String, default: ""
  field :phone_number, type: String
  field :password, type: String

  has_many :books
  validates :first_name, :last_name,  :password, presence: true 

end
