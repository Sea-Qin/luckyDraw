let personList = [
  { name: "邢岩", id: 26018962 },
  { name: "郝稼力", id: 26546558 },
  { name: "生庆", id: 26025946 },
  { name: "李庆磊", id: 26764004 },
  { name: "刘珏鸿", id: 29161839 },
  { name: "马琳", id: 20371451 },
  { name: "史壮莊", id: 29176117 },
  { name: "王东升", id: 26734635 },
  { name: "杨艳敏", id: 20173607 },
  { name: "张珍心", id: 23098939 },
  { name: "蔡畅", id: 26689272 },
  { name: "蔡春兵", id: 26709821 },
  { name: "陈祥芬", id: 26522325 },
  { name: "丛荣炎", id: 26566410 },
  { name: "葛彤", id: 29351073 },
  { name: "梁硕", id: 26668135 },
  { name: "林竣炜", id: 29403558 },
  { name: "李卓", id: 26712223 },
  { name: "罗秋悦", id: 28937245 },
  { name: "覃海冰", id: 26729254 },
  { name: "王佩", id: 23109707 },
  { name: "武文佳", id: 26519533 },
  { name: "杨思思", id: 23095083 },
  { name: "游芸芝", id: 26037242 },
  { name: "张凯良", id: 29027867 },
  { name: "林静", id: 23034008 },
  { name: "高吴蔓", id: 26035564 },
  { name: "郭坤", id: 29219635 },
  { name: "郭子雄", id: 29204606 },
  { name: "黄利", id: 28926177 },
  { name: "李君", id: 26710759 },
  { name: "路世翠", id: 26522323 },
  { name: "马远征", id: 26739371 },
  { name: "秦雅华", id: 23001582 },
  { name: "任皓", id: 26601722 },
  { name: "王明月", id: 26590183 },
  { name: "谢玉荣", id: 26670265 },
  { name: "徐雯", id: 29176255 },
  { name: "张玉凤", id: 23115946 },
  { name: "赵顺利", id: 26043489 },
  { name: "左玉星", id: 26693545 },
]; //人员列表,必填

const btnDom = document.getElementById("btn");
const showDom = document.getElementById("show");
const resultDom = document.getElementById("result-list");

document.getElementById("result").setAttribute("style", "display: none");

//生成随机数
const getRandom = (() => {
  let randomVal = new Date().getTime();
  return function () {
    randomVal ^= (randomVal << 13) & 0xffffffff;
    randomVal ^= randomVal >> 17;
    randomVal ^= (randomVal << 5) & 0xffffffff;
    randomVal = randomVal >>> 0; // 无符号右移位运算符向下取整
    return randomVal / 2 ** 32;
  };
})()

let intervalTimer;

btnDom.addEventListener("click", () => {
  const currentOperate = btnDom.innerHTML;
  if (currentOperate === "开始") {
    showDom.setAttribute("class", "");
    btnDom.innerHTML = "停止";

    let getLuckyPerson = () => {
      const luckyPersonIndex = Math.floor(getRandom() * personList.length);
      return personList[luckyPersonIndex];
    };

    intervalTimer = setInterval(() => {
      const luckyPerson = getLuckyPerson();
      showDom.innerHTML = `${luckyPerson.name}(${luckyPerson.id})`;
      showDom.setAttribute("personId", luckyPerson.id);
    }, 50);
  } else {
    clearInterval(intervalTimer);
    showDom.setAttribute("class", "success");
    btnDom.innerHTML = "开始";
    // 过滤已中奖人员
    const personId = showDom.getAttribute("personId");
    personList = personList.filter((person) => person.id !== Number(personId));
    // 更新展示中奖名单
    const resultChild = document.createElement("div");
    resultChild.innerHTML = showDom.innerHTML;
    resultDom.appendChild(resultChild);
    document.getElementById("result").setAttribute("style", "display: flex");
  }
});
