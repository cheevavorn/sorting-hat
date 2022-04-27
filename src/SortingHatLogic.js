let houseData = [{
    house: 'Gryffindor',
    animal: 'Lion',
    traits: 'Moral',    // คุณธรรม
    founder: 'Godric Gryffindor'
},{
    house: 'Hufflepuff',
    animal: 'Badger',
    traits: 'Intend',   // ความตั้งใจ
    founder: 'Helga Hufflepuff'
},{
    house: 'Ravenclaw',
    animal: 'Eagle',
    traits: 'Clever',   // ฉลาด
    founder: 'Rowena Ravenclaw'
},{
    house: 'Slytherin',
    animal: 'Snake',
    traits: 'Scam',     // ฉลาดแกมโกง
    founder: 'Salazar Slytherin'
}];

function checkHouseAvailable(results, sortingLimit){
    // return format -> { "Gryffindor": 0, "Ravenclaw": 0, "Hufflepuff": 0, "Slytherin": 0, houseAvailable: ["Gryffindor", ...] }
    const houseCountObj = {};
    const houseList = houseData.map(house => house.house);  // ชื่อบ้านจาก mock data
    const houseSorting = results.map(house => house.house); // ชื่อบ้านจากการคัดสรร

    for(const house of houseList) {
        const houseFilter = houseSorting.filter(houseSort => houseSort === house);
        houseCountObj[house] = houseFilter.length;
    }

    // สร้าง key `houseAvailable` เพื่อเก็บชื่อบ้านที่สามารถให้หมวกคัดสรรเลือกได้
    let minimumStudentPerHouse = Math.floor(sortingLimit/4);  // เผื่อไว้กรณีที่จำนวนนักเรียนไม่ใช่ 50 คน
    houseCountObj['houseAvailable'] = Object.keys(houseCountObj).filter(houseName => houseCountObj[houseName] <= minimumStudentPerHouse);
    return houseCountObj;
}

export function sortingHatSelector(results, sortingLimit){
    const houseAvailableObj = checkHouseAvailable(results, sortingLimit);
    const houseAvaiableList = houseAvailableObj.houseAvailable;
    
    // select with magic
    const idx = Math.floor(Math.random() * houseAvaiableList.length);
    return houseAvaiableList[idx];
}