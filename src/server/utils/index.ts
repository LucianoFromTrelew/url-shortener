import { createHash } from "crypto";
import { Error } from "mongoose";
import { DocumentType } from "@typegoose/typegoose";
import { ShortUrl } from "..";
import { ShortUrlClass } from "../models/url.model";

// Taken from here https://stackoverflow.com/a/3809435/12109515
export const URL_REGEX = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

type HexBase64Latin1Encoding = "latin1" | "hex" | "base64";
export function makeSha256Hash(
  str: string,
  digest: "latin1" | "hex" | "base64" = "hex"
) {
  return createHash("sha256")
    .update(str)
    .digest(digest);
}

export function isValidationError(error: any) {
  return error instanceof Error.ValidationError;
}

const BASE_URL = "https://pbid.io";
export function prepareData(data: DocumentType<ShortUrlClass>): ShortUrl {
  const { _id: id, url, slug } = data;
  return { id, url, slug: `${BASE_URL}/${slug as string}` };
}
