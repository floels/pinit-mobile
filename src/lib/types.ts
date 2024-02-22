export type Pin = {
  id: string;
  title: string;
  imageURL: string;
  authorUsername: string;
  authorDisplayName: string;
  authorProfilePictureURL?: string;
  description?: string;
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
