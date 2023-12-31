class Mutations::UpdateUser < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :email, String, required: true
  argument :first_name, String, required: true
  argument :last_name, String, required: true
  # argument :movie_worked, Integer, required: false
  field :user, Types::UserType, null: false
  field :errors, [String], null: false

  def resolve(id:, email:, first_name:, last_name:)
    user = User.find(id)

    if user.update(email: email, first_name: first_name, last_name: last_name)
      { user: user, errors: [] }
    else
      { user: nil, errors: user.errors.full_messages }
    end
  end
end