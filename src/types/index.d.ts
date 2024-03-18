interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  cfPassword: string;
  codeValidation?: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

type IUserLoginErrorProps = {
  show: boolean;
  message: string;
};

interface IUserLoginError {
  email: IUserLoginErrorProps;
  password: IUserLoginErrorProps;
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
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  language?: string;
  theme?: string;
  lock?: boolean;
  role?: string;
  avatar?: string;
  isFirstTime?: boolean;
  latitude?: number;
  longitude?: number;
  hobby?: string[];
  no_loading?: boolean;
  data_loaded?: boolean;
  destId?: string;
}

interface IPlace {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  vote: number;
  types: string[];
  status?: number;
  images: string[];
  distance?: number;
  selected?: boolean;
}

interface PlaceProps {
  id?: string;
  nameVi: string;
  nameEn: string;
  descriptionVi: string;
  descriptionEn: string;
  longitude: number;
  latitude: number;
  createdBy?: string;
  role?: string;
  vote: number;
  status?: number;
  images: string[];
  typesString?: string;
  types: string[];
  createdAt?: string;
}

interface PaginationProps {
  data: string[];
  scrollX: any;
}

interface PaginationPropsOutstanding {
  data: IPlace[];
  scrollX: any;
}

interface ListPlaceProps {
  data: string[];
  onRefresh?: () => void;
}

interface ListPlacePropsOutstanding {
  data: IPlace[];
  onRefresh?: () => void;
}

interface ListPlaceItemProps {
  placeItem: IPlace;
  onDismiss?: (placeItem: IPlace) => void;
}

interface CustomAlertProps {
  stateColor: string;
  displayMode: any;
  displayMsg: string;
  isStar?: boolean;
  isEdit?: boolean
  visible: boolean;
  inputComment?: string;
  star?: number
  onChangeInput?: (input: string) => void;
  onDimissAlert: (state: boolean) => void;
  onHandlerActionOK?: (star?: number) => void;
  onHandlerActionCANCEL?: () => void;
}

interface DialogHandleEvent {
  visible: boolean;
  type: 'success' | 'error' | 'warning';
  message: string;
  handleOk: () => void;
  handleCancel?: () => void;
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
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  hobby: string[];
}

interface CardUserProps {
  id: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  lock: boolean;
  hobby: string[];
  viewPlaces?: string[];
}

interface InputChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  contentComment?: string;
}

interface SwitchProps {
  label: string;
  isEnabled: boolean;
  activeText: string;
  inActiveText: string;
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
  secure?: boolean;
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
  hobby: string[];
  lock?: boolean;
  handleButtonLock: () => void;
  handleButtonReview: () => void;
}

interface InputSearchProps {
  value: string;
  handleChangeValueSearch: (value) => void;
  placeholderLabel?: string;
}

interface CustomInputInfoUserProps {
  label: string;
  nameIcon: IconName;
  value: string;
  name: keyof InfoProps;
  handleChangeValue: (name: keyof InfoProps, value: string) => void;
  changeEditable: boolean;
}

interface InfoProps {
  email: string;
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
  nameVi: string;
  nameEn: string;
  createdAt: string;
  handlePress: (id: string) => void;
}

interface CommentProps {
  _id: string;
  avatar: string;
  email: string;
  star: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  onActionRemove?: (id: string) => void;
  onActionEdit?: () => void;
}

interface TypesProps {
  id: string;
  typeName: string;
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

// create destination screen
interface UploadImages {
  id: number;
  uri: any;
}

interface FocusInfoUser {
  nameVi: boolean;
  nameEn: boolean;
  descriptionVi: boolean;
  descriptionEn: boolean;
  latitude: boolean;
  longitude: boolean;
}

interface DialogNotiProps {
  isShow: boolean;
  displayMsg: string;
}

type DestCustom = {
  id: string;
  label: string;
};

interface TypesFilterProps {
  dest: DestCustom;
  isChoose: boolean;
}

type ApiReturnDestination = {
  _id: string;
  nameVi: string;
  nameEn: string;
  descriptionVi: string;
  descriptionEn: string;
  latitude: number;
  longitude: number;
  vote: number;
  status: number;
  types: string[];
  images: string[];
  destination?: number;
  createdAt?: string;
  createdBy?: string;
  distance?: number;
};

type ApiReturnDestType = {
  _id: string;
  labelVi: string;
  labelEn: string;
};

type ApiReturnUserComment = {
  _id: string
  userId: string
  email: string
  avatar: string
  destinationId: string
  content: string
  star: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Position {
  coords: Coordinates;
}

interface GeolocationError {
  code: number;
  message: string;
}

interface ApiReturnPerson {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  hobby: [];
};
