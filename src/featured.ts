// to mimimise the data to be sent

interface itemType {
  name: string;
  imgSrc: [string];
  oldCost: number;
  newCost: number;
  avail: boolean;
  about: [string];
  Desc: [{ title: string; body: string }];
  type: string;
  featured: boolean;
}

interface toBeSent {
  name: [string];
  ImgSrc: [string];
  cost: [number];
  type: [string];
}

const featured = (item: itemType): toBeSent => {
  let data: toBeSent;
  for (const i in item) {
    data.name = item[i].name;
    data.ImgSrc = item[i].imgSrc[0];
    data.cost = item[i].newCost;
    data.type = item[i].type;
  }

  return data;
};

export default featured;
