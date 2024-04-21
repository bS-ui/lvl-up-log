import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  text: String,
  likes: Number,
})
const gameSchema = new Schema({
  name: String,
  imageUrl: String,
  rawgId: Number,
  review: reviewSchema,
  rating: Number,
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  favoriteGame: gameSchema,
  recentlyPlayedGames: [gameSchema],
  favoriteGameGenre: String,
  steam: String,
  discord: String,
  location: String,
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
