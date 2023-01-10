let personList = [
  { name: "邢岩", id: 201 },
  { name: "郝稼力", id: 202 },
  { name: "生庆", id: 203 },
  { name: "李庆磊", id: 204 },
  { name: "刘珏鸿", id: 205 },
  { name: "马琳", id: 206 },
  { name: "史壮莊", id: 207 },
  { name: "王东升", id: 208 },
  { name: "杨艳敏", id: 209 },
  { name: "张珍心", id: 210 },
  { name: "蔡畅", id: 211 },
  { name: "蔡春兵", id: 212 },
  { name: "陈祥芬", id: 213 },
  { name: "丛荣炎", id: 214 },
  { name: "葛彤", id: 215 },
  { name: "梁硕", id: 216 },
  { name: "林竣炜", id: 217 },
  { name: "李卓", id: 218 },
  { name: "罗秋悦", id: 219 },
  { name: "覃海冰", id: 220 },
  { name: "王佩", id: 221 },
  { name: "武文佳", id: 222 },
  { name: "杨思思", id: 223 },
  { name: "游芸芝", id: 224 },
  { name: "张凯良", id: 225 },
  { name: "林静", id: 226 },
  { name: "高吴蔓", id: 227 },
  { name: "郭坤", id: 228 },
  { name: "郭子雄", id: 229 },
  { name: "黄利", id: 230 },
  { name: "李君", id: 231 },
  { name: "路世翠", id: 232 },
  { name: "马远征", id: 233 },
  { name: "秦雅华", id: 234 },
  { name: "任皓", id: 235 },
  { name: "王明月", id: 236 },
  { name: "谢玉荣", id: 237 },
  { name: "徐雯", id: 238 },
  { name: "张玉凤", id: 239 },
  { name: "赵顺利", id: 240 },
  { name: "左玉星", id: 241 },
]; //人员列表,必填

const btnDom = document.getElementById("btn");
const showDom = document.getElementById("show");
const resultDom = document.getElementById("result-list");

document.getElementById("result").setAttribute("style", "display: none");

//xorshift算法生成随机数
const getRandom = (() => {
  let randomVal = new Date().getTime();
  return function () {
    randomVal ^= randomVal << 13;
    randomVal ^= randomVal >> 17;
    randomVal ^= randomVal << 5;
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
