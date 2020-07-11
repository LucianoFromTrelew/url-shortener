import { prop, getModelForClass } from "@typegoose/typegoose";

class ShortUrl {
  @prop()
  public url?: string;

  @prop()
  public slug?: string;
}

export const ShortUrlModel = getModelForClass(ShortUrl);
