import {StyleSheet} from 'react-native';

// export const colors = {
//   primary: '#4182FF',
//   secondary: '#C42A0C',
//   background: '#171519',
//   card: '#232125',
//   text: '#E4E4E4',
//   border: '#707070',
// };

export const gradientColors = ['#656368', '#171519'];

export const text = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  xl: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lg: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lgThin: {
    fontSize: 20,
  },
  md: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  mdThin: {
    fontSize: 14,
  },
  sm: {
    fontSize: 12,
  },
  smThin: {
    fontSize: 12,
    fontWeight: '200',
  },
  smBold: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  m: {
    fontSize: 10,
  },
  mBold: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  mThin: {
    fontSize: 10,
    fontWeight: '200',
  },
});

export const layout = StyleSheet.create({
  hsb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vsb: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#232125',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});

export const size = {
  xl: 50,
  lg: 20,
  md: 10,
  sm: 5,
  iconLg: 25,
  iconMd: 20,
  iconSm: 15,
  sectionHeight: 250,
  mpSize: 70,
  eventCard: {width: 190, height: 250},
  organizerCard: {width: 170, height: 250},
  dateCard: {width: 130, height: 162},
};
