import path from 'path';

const theme = [
  {
    name:'theme1',
    path:`${path.join(__dirname,'../theme/theme1.less')}`
  },
  {
    name:'theme2',
    path:`${path.join(__dirname, '../theme/theme2.less')}`
  }
]

export default theme;