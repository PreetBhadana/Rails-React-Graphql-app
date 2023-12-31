class Mutations::DeleteUser < Mutations::BaseMutation
  argument :id, ID, required: true
  field :user, Types::UserType, null: false
  field :errors, [String], null: false

  def resolve(id:)
    user = User.find(id)

    if user.destroy
      { user: nil, errors: [] }
    else
      { user: user, errors: user.errors.full_messages }
    end
  end
end