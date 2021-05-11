export class CallDaTa{
    getListData(){
        let promise=axios({
            method:"get",
            url:"https://6065c022b8fbbd0017567387.mockapi.io/dressing"
        })
        return promise;
    }

}