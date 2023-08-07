class Mutations::DeleteMovie < Mutations::BaseMutation
  argument :id, ID, required: true

  field :movie, Types::MovieType, null: false
  field :errors, [String], null: false

  def resolve(id:)
    movie = Movie.find(id)
    if movie.destroy
      { movie: { id: 'All finished, kuch ni bcha!!' }, errors: [] }
    else
      { movie: movie, errors: movie.errors.full_messages }
    end
  end
end