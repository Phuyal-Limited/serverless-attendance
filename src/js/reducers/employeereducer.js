export default function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var m = mm.toString();
    var d = dd.toString();
    if (mm < 10) {
        m = "0" + mm.toString();
    }
    if (dd < 10) {
        d = "0" + dd.toString();
    }
    var yyyy = today.getFullYear();
    var dateForSearch = yyyy.toString() + '-' + m.toString() + '-' + d.toString();
    var monthForSearch = yyyy.toString() + '-' + m.toString();
    return {
        search: dateForSearch,
        searchmonth: monthForSearch,
        info:'manoj acharya',
        monthlyinfo:[],
        dateDisplayField:'',
        monthDisplayField:''
    };
}