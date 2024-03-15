import {languageConstant} from '@/API/src/utils/constant';

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const randomNumberString = () => {
  // Generate a random number between 1000 and 9999
  return Math.floor(Math.random() * 9000) + 1000;
};

export const getRandomIntInclusive = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getErrorMessage = (e: any) => {
  let errorMsg = '';
  if (e.response && e.response.data && e.response.data.message) {
    console.log('Error: ', e.response.data.message);
    errorMsg = e.response.data.message;
  } else {
    console.log('Error: Network error\n', e);
    errorMsg = 'Network error';
  }
  return errorMsg;
};

export const getItemPagination = (page: number) => {
  return 1 * page;
};

export const formatDestination = (
  place: ApiReturnDestination,
  user: IAuthenticatedUser | null,
): IPlace => ({
  id: place._id,
  name: user?.language === languageConstant.VI ? place.nameVi : place.nameEn,
  description:
    user?.language === languageConstant.VI
      ? place.descriptionVi
      : place.descriptionEn,
  latitude: place.latitude,
  longitude: place.longitude,
  images: place.images,
  types: place.types,
  status: place.status,
  vote: place.vote,
});

export const defaultDialog: DialogHandleEvent = {
  visible: false,
  type: 'success',
  message: '',
  handleOk: () => {},
};
