var db=require('../db').db
module.exports={
    save:function (salesinfo) {
        db.transactions.insert(salesinfo)
    }
}
