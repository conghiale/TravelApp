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
  distance: place.distance,
});

const ITEM_PER_PAGE = 2;
export const getItemPagination = (page: number) => {
  return ITEM_PER_PAGE * page;
};

export const isShowMoreUtil = (places: any, page: number) => {
  return places.length > places.slice(0, getItemPagination(page)).length;
}

export const isShowBtnPagination = (dataSource: any) => {
  return dataSource.length !== 0 && dataSource.length > ITEM_PER_PAGE;
}

export const defaultDialog: DialogHandleEvent = {
  visible: false,
  type: 'success',
  message: '',
  handleOk: () => {},
};

export const parseTimestamp = (timestamp: string) => {
  const parsedDate = new Date(timestamp);
  console.log(parsedDate);

  const day = parsedDate.getDate();
  const month = parsedDate.getMonth() + 1;
  const year = parsedDate.getFullYear();

  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();
  const seconds = parsedDate.getSeconds();

  const paddedDay = day < 10 ? '0' + day : day;
  const paddedMonth = month < 10 ? '0' + month : month;
  const paddedHours = hours < 10 ? '0' + hours : hours;
  const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const paddedSeconds = seconds < 10 ? '0' + seconds : seconds;

  return `${paddedDay}/${paddedMonth}/${year} ${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};
