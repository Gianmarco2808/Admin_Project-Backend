import mongoose, { Schema, Types } from "mongoose"
import { IToken } from "../interfaces"

const TokenSchema : Schema = new Schema ({
     token: {
          type: String,
          required: true
     },
     user: {
          type: Types.ObjectId,
          ref: 'User'
     },
     expiresAt: {
          type: Date,
          default: Date.now(),
          expires: '5m'
     },
})

const Token = mongoose.model<IToken>('Token', TokenSchema)
export default Token