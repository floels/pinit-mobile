import { useTranslation } from "react-i18next";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import styles from "./AccountDetails.styles";
import Spinner from "../Spinner/Spinner";

import { Colors } from "@/src/global.styles";
import { AccountPublicDetails } from "@/src/lib/types";

type AccountDetailsProps = {
  accountDetails: AccountPublicDetails | undefined;
  isError: boolean;
  isLoading: boolean;
  onPressBack: () => void;
};

const Logo = (props: any) => (
  <Svg height="16" width="16" viewBox="0 0 24 24" {...props}>
    <Path
      fill={Colors.fontSecondary}
      d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12"
    />
  </Svg>
);

const AccountDetails = ({
  accountDetails,
  isLoading,
  isError,
  onPressBack,
}: AccountDetailsProps) => {
  const { t } = useTranslation();

  const hasBackgroundPicture = !!accountDetails?.backgroundPictureURL;

  const backButtonIconStyle = hasBackgroundPicture
    ? styles.backButtonIconWithBackgroundPicture
    : null;

  const backButton = (
    <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
      <FontAwesome5Icon
        name="chevron-left"
        size={20}
        style={backButtonIconStyle}
      />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        {backButton}
        <View style={styles.loadingOrErrorStateContainer}>
          <Spinner>
            <FontAwesome5Icon
              name="spinner"
              size={40}
              style={styles.spinnerIcon}
            />
          </Spinner>
        </View>
      </View>
    );
  }

  if (isError || !accountDetails) {
    return (
      <View style={styles.container}>
        {backButton}
        <View style={styles.loadingOrErrorStateContainer}>
          <FontAwesome5Icon
            name="exclamation-circle"
            size={40}
            style={styles.errorIcon}
          />
          <Text style={styles.errorText}>
            {t("AccountDetails.ERROR_FETCH_ACCOUNT_DETAILS")}
          </Text>
        </View>
      </View>
    );
  }

  let picturesBlock;

  if (hasBackgroundPicture) {
    const screenWidth = Dimensions.get("window").width;

    picturesBlock = (
      <View style={styles.backgroundPictureAndProfilePicture}>
        <Image
          source={{ uri: accountDetails.backgroundPictureURL }}
          width={screenWidth}
          style={styles.backgroundPictureImage}
        />
        <Image
          source={{ uri: accountDetails.profilePictureURL }}
          style={[
            styles.profilePictureImage,
            styles.profilePictureImageWithBackgroundPicture,
          ]}
        />
      </View>
    );
  } else {
    picturesBlock = (
      <Image
        source={{ uri: accountDetails.profilePictureURL }}
        style={[
          styles.profilePictureImage,
          styles.profilePictureImageWithoutBackgroundPicture,
        ]}
      />
    );
  }

  return (
    <View style={styles.container}>
      {backButton}
      {picturesBlock}
      <Text style={styles.displayName}>{accountDetails.displayName}</Text>
      <View style={styles.logoAndUsername}>
        <Logo style={styles.logo} />
        <Text style={styles.username}>{accountDetails.username}</Text>
      </View>
    </View>
  );
};

export default AccountDetails;
