import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  rowFlex: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  cardCover: {
    display: 'flex',
    flex: 1,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  feedContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 0,
    width: '100%',
    backgroundColor: '#f7f7f7',
  },
  topRow: {
    justifyContent: 'space-around',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    textAlign: 'center',
    marginBottom: 5,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 10,
  },
  userNameBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'flex-start',
  },
  followBtn: {
    backgroundColor: '#d63529',
    padding: 3,
    color: '#fff',
    borderRadius: 5,
    width: 100,
    marginTop: 5,
    fontFamily: 'Roboto',
    fontSize: 12,
    borderColor: '#d63529',
    borderWidth: 1,
  },
  unfollowBtn: {
    backgroundColor: '#fff',
    padding: 3,
    color: '#d63529',
    borderRadius: 5,
    width: 100,
    marginTop: 5,
    fontFamily: 'Roboto',
    fontSize: 10,
    borderColor: '#d63529',
    borderWidth: 1,
  },
  followText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
  },
  unfollowText: {
    color: '#d63529',
    textAlign: 'center',
    fontSize: 12,
  },
  followBlock: {
    width: '40%',
    alignItems: 'flex-end',
  },
  detail: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  postDetail: {
    width: '30%',
  },
  PlayBtns: {
    width: '100%',
    height: '100%',
  },
  likes: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likestext: {
    fontSize: 12,
    color: '#545454',
  },
  recordBtn: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#eb3434',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 5,
  },
  recording: {
    width: 100,
    height: 100,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 11,
  },
  secTime: {
    color: '#6e727c',
    marginLeft: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
    paddingTop: 3,
    borderRadius: 2,
    backgroundColor: '#fafafa',
  },
});
export default styles;
