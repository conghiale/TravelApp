import {Text, TouchableOpacity} from 'react-native';
import styles from './button01.style';
import theme from '@/utils/theme';
import {font} from '@/utils/font';

type ButtonProps = {
  height?: number;
  label: string;
  color?: string;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  destStatus?: number;
};

const Button01 = ({height, label, color, onPress, destStatus}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.button,
        {
          backgroundColor: color ? color : theme.colors.orange,
          height: height ? height : 36,
          marginVertical: 2,
        },
        destStatus === 2 || destStatus === 1 ? {pointerEvents: 'none'} : {},
        destStatus === 2 || destStatus === 1
          ? {backgroundColor: theme.colors.grey}
          : {},
      ]}
      onPress={onPress}>
      <Text style={[styles.button_label]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button01;
