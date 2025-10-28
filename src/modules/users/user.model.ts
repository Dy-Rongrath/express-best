import mongoose, { Schema, InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
  name: { type: String, required: true, trim: true, minlength: 1 },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(_doc, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.passwordHash;
        return ret;
      }
    }
  }
);

// Example compound index you might add later:
// UserSchema.index({ email: 1 }, { unique: true });

export type UserDoc = InferSchemaType<typeof UserSchema> & { id: string };
export const UserModel = mongoose.model("User", UserSchema);
