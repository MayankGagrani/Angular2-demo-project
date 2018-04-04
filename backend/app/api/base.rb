class Base < Grape::API
  	
  # include V1::Default
	  prefix :api
	  version 'v1', using: :path
	  format :json
  
 		mount V1::UserController
end