class Currency {
    constructor (canadianDollar) {
        this.canadianDollar = canadianDollar
    }

    roudTwoDecimals (amount) {
        return Math.round(amount * 100) / 100
    }

    canadianToUS (canadians) {
        return this.roudTwoDecimals(canadians * this.canadianDollar)
    }

    usToCanadian (us) {
        return this.roudTwoDecimals(us / this.canadianDollar)
    }
}

module.exports = Currency