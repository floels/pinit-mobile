export type PinBasicDetails = {
  title: string;
  imageURL: string;
  description?: string;
};

export type PinWithAuthorDetails = PinBasicDetails & {
  authorUsername: string;
  authorDisplayName: string;
  authorProfilePictureURL: string;
};

enum TypesOfAccount {
  PERSONAL = "personal",
  BUSINESS = "business",
}

export type AccountPublicDetails = {
  type: TypesOfAccount;
  username: string;
  displayName: string;
  profilePictureURL?: string;
  backgroundPictureURL?: string;
  description?: string;
};
