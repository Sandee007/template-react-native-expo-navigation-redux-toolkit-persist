import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface Props {
  label: string;
  invalid: boolean;
  textInputConfig?: TextInputProps;
  style?: ViewStyle;
}

export default function Input({ label, textInputConfig, style , invalid}: Props) {
  const inputStyles: StyleProp<TextStyle> = [styles.input];
  if (!!textInputConfig && textInputConfig.multiline) inputStyles.push(styles.inputMultiline);

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}> {label} </Text>
      <TextInput style={[inputStyles, invalid && styles.invalidInput]} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error50,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
