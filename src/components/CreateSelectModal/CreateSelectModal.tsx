import { useTranslation } from "react-i18next";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import styles from "./CreateSelectModal.styles";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

type CreateSelectModalProps = {
  handlePressCreatePin: () => void;
  handleClose: () => void;
};

const CreateSelectModal = ({
  handlePressCreatePin,
  handleClose,
}: CreateSelectModalProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={true}
        transparent={true}
        onRequestClose={handleClose}
      >
        <View style={styles.modal}>
          <View style={styles.closeButtonAndTitle}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <FontAwesome5Icon name="times" size={24} />
            </TouchableOpacity>
            <Text style={styles.title}>
              {t("TabsNavigationBar.CREATE_SELECT_MODAL_TITLE")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handlePressCreatePin}
            style={styles.createPinButton}
          >
            <View style={styles.createPinIconContainer}>
              <FontAwesome5Icon name="thumbtack" size={20} />
            </View>
            <Text>{t("TabsNavigationBar.CREATE_PIN_TITLE")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CreateSelectModal;
