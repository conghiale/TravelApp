interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  cfPassword: string;
  codeValidation?: string;
}

interface IUserLogin {
  email: string
  password: string
}

type IUserLoginErrorProps = {
  show: boolean,
  message: string
}

interface IUserLoginError {
  email: IUserLoginErrorProps,
  password: IUserLoginErrorProps
}

interface Dialog {
  type: string;
  message: string;
}

interface DialogProps {
  dialog: Dialog;
  handleClose: () => void;
  handleOk: () => void;
}

type ErrorProps = {
  show: boolean;
  message: string;
};

interface IUserError {
  email: ErrorProps;
  firstName: ErrorProps;
  lastName: ErrorProps;
  password: ErrorProps;
  cfPassword: ErrorProps;
}

interface IAuthenticatedUser {
  id: string,
  email: string;
  name: string;
  language: string;
  lock: boolean;
  role: string;
  avatar: string;
  isFirstTime?: string;
}

interface PlaceProps {
  id: String
  destination: string
  content: string
  star: number
  longitude: number
  latitude: number
  status?: number
  images?: uri[]
  types?: string[]
  isEnglish?: boolean
}

interface PaginationProps {
  data: PlaceProps[];
  scrollX: any;
}

interface ListPlaceProps {
  data: PlaceProps[];
  onRefresh?: () => void
}

interface ListPlaceItemProps {
  placeItem: PlaceProps;
  onDismiss?: (placeItem: PlaceProps) => void;
}

interface CustomAlertProps {
  stateColor: string;
  displayMode: any;
  displayMsg: string;
  isStar?: boolean;
  visible: boolean;
  onDimissAlert: (state: boolean) => void;
  onHandlerActionOK?: (star?: number) => void;
  onHandlerActionCANCEL?: () => void;
}

interface DialogNotificationProps {
  status: string;
  displayMode: any;
  displayMsg: string;
  visible: boolean;
  onDimissAlert: (state: boolean) => void;
  onHandlerActionOK?: () => void;
  onHandlerActionCANCEL?: () => void;
}

interface DialogChooseImageProps {
  visible: boolean;
  onDimissAlert: (state: boolean) => void;
  onHandlerActionCamera: ({ type, options1, options2 }: any) => void;
  onHandlerActionGallery: ({ type, options1, options2 }: any) => void;
  onHandlerActionRemove: () => void;
}

interface Asset {
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  originalPath?: string;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
  bitrate?: number;
  timestamp?: string;
  id?: string;
}

interface ImagePickerResponse {
  didCancel?: boolean;
  errorCode?: ErrorCode;
  errorMessage?: string;
  assets?: Asset[];
}

interface Person {
  email: string;
  firstName: string;
  lastName: string;
  image: any;
  hobby: string;
  isEnglish: boolean;
  isLight: boolean;
}

interface CardUserProps {
  id: string
  image: string
  gmail: string
  firstName: string
  lastName: string
  hobby: string
  lock: boolean
}

interface InputChangePassword {
  notValue: '';
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SwitchProps {
  label: string;
  isEnabled: boolean;
  toggleSwitch?: () => void;
}

interface CustomTabBarButtonProps {
  children: any;
  onPress?: any;
}

interface CustomInputProps {
  name: keyof InputChangePassword;
  value: string;
  placeholder: string;
  handleInputChangeName?: (
    name: keyof InputChangePassword,
    value: string,
  ) => void | null;
  handleInputChange?: (value: string) => void | null;
}

interface BorderButtonProps {
  height: number;
  label: string;
  nameIcon: IconName;
  onPress?: () => void;
}

interface Button02Props {
  height: number;
  label: string;
  lock?: boolean;
  onPress: () => void;
}

interface LabelScreenProps {
  title: string;
  color?: string;
  nameIcon: IconName;
}

interface ProfileUserProps {
  image: string;
  email: string;
  firstName: string;
  LastName: string;
  hobby: string;
  lock?: boolean;
  handleButtonLock: () => void;
  handleButtonReview: () => void;
}

interface InputSearchProps {
  value: string;
  handleChangeValueSearch: (value) => void;
}

interface CustomInputInfoUserProps {
  label: string;
  nameIcon: IconName;
  value: string;
  name: keyof InfoProps;
  handleChangeValue: (name: keyof InfoProps, value: string) => void;
}

interface InfoProps {
  email: string
  firstName: string;
  lastName: string;
  hobby: string;
}

interface LoginHistoryItemProps {
  id: number;
  startTime: string;
  endTime: string;
  time: string;
}

interface ApprovalListItemProps {
  id: string;
  index: number;
  destination: string;
  handlePress: (id: string) => void;
}

interface CommentProps {
  id: number;
  image: string;
  nameUser: string;
  star: number;
  content: string;
}

interface TypesProps {
  id: string,
  typeName: string,
}
interface TypesFilterProps {
  type: TypesProps,
  isChoose: boolean,
}

interface Action {
  // title: string;
  type: 'capture' | 'library';
  options1: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
  options2: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

type IconName =
  | 'home'
  | 'places'
  | 'loved'
  | 'personal'
  | 'in'
  | 'eye'
  | 'uneye'
  | 'search'
  | 'topPlace'
  | 'star'
  | 'star01'
  | 'star02'
  | 'nearestPlace'
  | 'createDestination'
  | 'list'
  | 'add'
  | 'dropdown'
  | 'newest'
  | 'person'
  | 'setting'
  | 'cancel'
  | 'userList'
  | 'lock'
  | 'unLock'
  | 'back'
  | 'edit'
  | 'sub'
  | 'gmail'
  | 'circleReset'
  | 'email'
  | 'password'
  | 'arrowLeft'
  | 'advanced'
  | 'send'
  | 'camera'
  | 'remove'
  | 'gallery';
