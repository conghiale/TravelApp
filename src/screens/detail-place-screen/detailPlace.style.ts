import {font} from '@/utils/font';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  containerHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  containerTitle: {
    flex: 1,
    alignItems: 'center',
    marginStart: -50,
    justifyContent: 'center',
  },
  label: {
    fontFamily: font.bold,
  },
  placeDetail: {
    width: '100%',
    gap: 10,
    marginTop: 16,
  },
  imageContainer: {
    width: '100%',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  //rating
  ratingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },

  rating: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  // Decription
  content: {
    fontFamily: font.semiBold,
    textAlign: 'justify',
  },

  boldText: {
    fontWeight: 'bold',
  },

  // Comment
  commentContainer: {
    width: '100%',
    gap: 10,
    marginTop: 20,
  },

  commentBox: {
    // height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  title: {
    fontFamily: font.semiBold,
  },

  sendBtn: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

    paddingHorizontal: 16,
  },

  containerUserComment: {
    marginTop: 16,
    gap: 30,
  },
  userCommentItem: {
    paddingVertical: 16,
    paddingHorizontal: 4,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  containerButtonFooter: {
    marginTop: 32,
    marginBottom: 12,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  //Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default styles;
