export const ellipsizeText = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }

  return text;
};

export const appendQueryParam = ({
  url,
  key,
  value,
}: {
  url: string;
  key: string;
  value: string;
}) => {
  const separator = url.includes("?") ? "&" : "?";

  return `${url}${separator}${key}=${encodeURIComponent(value)}`;
};
