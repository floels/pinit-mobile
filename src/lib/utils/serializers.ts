import {
  AccountPrivateDetails,
  AccountPublicDetails,
  Board,
  PinWithAuthorDetails,
  PinWithBasicDetails,
} from "../types";

export const serializePinWithBasicDetails = (pin: any): PinWithBasicDetails => {
  return {
    id: pin.unique_id,
    imageURL: pin.image_url,
    title: pin.title,
    description: pin.description,
  };
};

export const serializePinWithAuthorData = (pin: any): PinWithAuthorDetails => {
  return {
    ...serializePinWithBasicDetails(pin),
    authorUsername: pin.author.username,
    authorDisplayName: pin.author.display_name,
    authorProfilePictureURL: pin.author.profile_picture_url,
  };
};

export const serializePinsWithAuthorData = (
  pins: any,
): PinWithAuthorDetails[] => {
  return pins.map(serializePinWithAuthorData);
};

export const serializeAccountPublicDetails = (
  account: any,
): AccountPublicDetails => {
  return {
    username: account.username,
    displayName: account.display_name,
    profilePictureURL: account.profile_picture_url,
    boards: serializeBoards(account.boards),
    backgroundPictureURL: account.background_picture_url,
    description: account.description,
  };
};

export const serializeAccountPrivateDetails = (
  account: any,
): AccountPrivateDetails => {
  return {
    ...serializeAccountPublicDetails(account),
    type: account.type,
    initial: account.initial,
  };
};

export const serializeBoard = (board: any): Board => {
  return {
    id: board.unique_id,
    title: board.title,
    coverPictureURL: board.cover_picture_url,
  };
};

export const serializeBoards = (boards: any): Board[] => {
  return boards.map(serializeBoard);
};
