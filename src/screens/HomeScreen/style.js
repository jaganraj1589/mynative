import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row'
  },
  logo: {
    width: 24,
    flexGrow: 1,
  },
});

export default styles;
