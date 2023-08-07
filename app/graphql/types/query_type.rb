module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    #get all users
    field :users, [Types::UserType], null: false
    def users
      User.all.includes(:movies)
    end

    #Get user by ID
    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end
    def user(id:)
      User.find(id)
    end

    field :movies, [Types::MovieType], null: false
    def movies
      Movie.all
    end

    field :movie, Types::MovieType, null: false do
      argument :id, ID, required: true
    end
    def movie(id:)
      Movie.find(id)
    end
  end
end
