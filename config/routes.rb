Rails.application.routes.draw do
  get '/', to: 'home#index'
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "graphql#execute"
  end
  
  post "/graphql", to: "graphql#execute"
end
