import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    _id: false,
    type: {
      dialCode: { type: String, required: true },
      number: { type: String, required: true, unique: true },
    },
  })
  phoneNumber: {
    dialCode: string;
    number: string;
  };

  @Prop({ required: false })
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
