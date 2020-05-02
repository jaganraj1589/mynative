import {Dimensions} from 'react-native';
import { StyleSheet } from 'react-native';

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
  },
  feedContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  topRow: {
    justifyContent: 'space-around',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
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
    backgroundColor: '#fb9f1d',
    padding: 5,
    color: '#fff',
    borderRadius: 5,
    width: 100,
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
});
export default styles;
