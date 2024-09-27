import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'black',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  textSign1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#420475',
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 260,
    width: 260,
    marginTop: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 3,
    marginTop: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#420475',
    borderRadius: 50,
  },
  action1: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: -10,
    paddingHorizontal: 15,

    borderWidth: 1,
    borderColor: '#420475',
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    color: 'white',
    // color: '#05375a',
  },
  loginContainer: {
    backgroundColor: '#4361ee',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#420475',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
    alignItems: 'center',
    textAlign: 'center',
    margin: 20,
    color: 'white',
    // backgroundColor:'white'
  },
  inBut: {
    width: '70%',
    backgroundColor: '#420475',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  inBut2: {
    backgroundColor: '#420475',
    height: 65,
    width: 65,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inBut3: {
    backgroundColor: 'white',
    height: 50,
    width: 200,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallIcon2: {
    fontSize: 40,
    // marginRight: 10,
  },
  bottomText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  radioButton_div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioButton_inner_div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton_title: {
    fontSize: 20,
    color: '#420475',
  },
  radioButton_text: {
    fontSize: 16,
    color: 'white',
  },
});
export default styles;
