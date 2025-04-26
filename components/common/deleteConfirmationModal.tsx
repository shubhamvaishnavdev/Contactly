import { Modal, View, Text, TouchableOpacity } from "react-native";

export default function CustomDeleteModal({
  visible,
  onClose,
  onConfirm,
}: any) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Put the background color and full height/width in a View inside Modal */}
      <View className="flex-1 justify-center items-center bg-purple-700">
        <View className="bg-cardBackground dark:bg-dark-cardBackground p-6 rounded-xl w-80">
          <Text className="text-lg font-bold mb-4 text-center text-text dark:text-dark-text">
            Delete Confirmation
          </Text>
          <Text className=" text-text dark:text-dark-text mb-4 text-center text-wrap">
            Are you sure you want to delete this item?
          </Text>

          <View className="flex-row justify-around">
            <TouchableOpacity
              onPress={onClose}
              className="px-4 py-2 rounded-md border border-borderColor dark:border-dark-borderColor"
            >
              <Text className="text-text dark:text-dark-text">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className="px-4 py-2 rounded-md bg-primaryBtnBackground dark:bg-dark-primaryBtnBackground"
            >
              <Text className="text-primaryBtnText dark:text-dark-primaryBtnText">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
