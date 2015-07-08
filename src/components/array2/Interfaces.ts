

//二维数组
interface Array2 extends Array<Array<any>>{

}

//Filter实现的是对二维数组的整体操作
interface Array2Filter{
  filter(array2:Array2):Array2;
}
