class Mutations::CreateMovie < Mutations::BaseMutation
  argument :title, String, required: true
  argument :year, Integer, required: true
  argument :genre, String, required: true
  argument :user_id, Integer, required: true

  field :movie, Types::MovieType, null: false
  field :errors, [String], null: false

  def resolve(title:, year:, genre:, user_id:)
    movie = Movie.new(title: title, year: year, genre: genre, user_id: user_id)
    if movie.save
      { movie: movie, errors: [] }
    else
      { movie: nil, errors: movie.errors.full_messages }
    end
  end
end