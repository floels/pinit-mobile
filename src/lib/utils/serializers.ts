export const getPinWithCamelCaseKeys = (pin: any) => {
  return {
    id: pin.unique_id,
    imageURL: pin.image_url,
    title: pin.title,
    description: pin.description,
    authorUsername: pin.author.username,
    authorDisplayName: pin.author.display_name,
    authorProfilePictureURL: pin.author.profile_picture_url,
  };
};

export const getPinsWithCamelCaseKeys = (pins: any[]) => {
  return pins.map(getPinWithCamelCaseKeys);
};
