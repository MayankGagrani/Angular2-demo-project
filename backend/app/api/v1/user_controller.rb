module V1
  class UserController < Grape::API
      # include API::V1::Defaults

      resources :users do

      	desc "get all user"
      	params do

      	end

      	get "users"  do
      		User.all 
      	end
     end
   end
end