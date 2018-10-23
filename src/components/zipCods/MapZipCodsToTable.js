export default function(array, minDay = 0, maxDay = 6) {
    let maxZipCodeLength = 0;
    const dayOfWeek_codes = {};

    //Высчитваем высоту таблицы по самому длинному списку zipCodes
    //создаем словарь быстрого достуав к масииву кодов по дню недели dayOfWeek_codes
    array.forEach(({ dayOfWeek, zipCodes }) => {
        dayOfWeek_codes[dayOfWeek] = zipCodes;
        if (zipCodes.length > maxZipCodeLength) {
            maxZipCodeLength = zipCodes.length;
        }
    });

    //создаем результирующий массив размерностью maxZipCodeLength
    const rows = new Array(maxZipCodeLength).fill(null);

    rows.forEach((_, i) => {
        rows[i] = [];
        for (let dayOfWeek = minDay; dayOfWeek <= maxDay; dayOfWeek++) {
            if (
                dayOfWeek_codes[dayOfWeek] !== undefined &&
                dayOfWeek_codes[dayOfWeek][i] !== undefined
            ) {
                rows[i].push(dayOfWeek_codes[dayOfWeek][i]);
            } else {
                rows[i].push("");
            }
        }
    });
    return rows;
}
