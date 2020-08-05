import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import { makeSha256Hash, URL_REGEX } from "../utils";

@pre<ShortUrlClass>("save", function() {
  /**
   * slug is a generated value taking the 8 first characteres out of the SHA256 hash of a random number
   * they could still collide though, but what are the odds?
   */
  this.slug = makeSha256Hash(Math.random().toString()).slice(0, 8);
})
export class ShortUrlClass {
  @prop({ required: true, match: URL_REGEX })
  public url!: string;

  @prop({ unique: true })
  public slug?: string;
}

export const ShortUrlModel = getModelForClass(ShortUrlClass);
