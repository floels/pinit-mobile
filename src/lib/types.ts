export type PinWithBasicDetails = {
  id: string;
  title: string;
  imageURL: string;
  description?: string;
};

export type PinWithAuthorDetails = PinWithBasicDetails & {
  authorUsername: string;
  authorDisplayName: string;
  authorProfilePictureURL: string;
};

export enum TypesOfAccount {
  PERSONAL = "personal",
  BUSINESS = "business",
}

export type AccountPublicDetails = {
  username: string;
  displayName: string;
  profilePictureURL: string | null;
  backgroundPictureURL: string | null;
  description: string | null;
  boards: Board[];
};

export type AccountPrivateDetails = AccountPublicDetails & {
  type: TypesOfAccount;
  initial: string;
};

export type Board = {
  id: string;
  title: string;
  coverPictureURL: string | null;
};
