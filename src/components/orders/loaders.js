import ApiController from "../../badcode/ApiController";

const pagesToItemsArray = (resArray, items = [], dataKey = 'bookingList') => {
    resArray.forEach(resI => {
        items = [...items, ...resI[dataKey]]
    });
    return items;
};
const allPagesLoader = (args, loader, dataKey = 'bookingList') => {
    return loader(args).then(res => {
        if (!res) {
            return [];
        } else if (+res.pages === 0) {
            return res[dataKey];
        } else {
            let items = res[dataKey];
            const loadings = [];
            for (let i = 1; i <= +res.pages; i++) {
                loadings.push(loader({
                    ...args,
                    page: i
                }))
            }
            return Promise.all(loadings).then(pages => pagesToItemsArray(pages, items, dataKey))
        }
    })
};
export const loadNewBookings = args => allPagesLoader({
    page: 0,
    ...args
}, (args) => ApiController.fetch('admin/get_booking_list_new_only/', args));
export const loadAllBookings = args => allPagesLoader({
    page: 0,
    ...args
}, (args) => ApiController.fetch('admin/get_booking_list/', args));

export const loadArchivedBookings = args => allPagesLoader({
    page: 0,
    ...args
}, (args) => ApiController.fetch('admin/get_booking_list_archived/', args));

