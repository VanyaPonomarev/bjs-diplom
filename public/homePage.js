"use strict"

const logout = new LogoutButton();
logout.action = function () {
    let callback = (response) => {
        if (response.success) {
            location.reload();
        }
    }

    ApiConnector.logout(callback);
}

let callback = (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
}
ApiConnector.current(callback);

let refresh = () => {
    let rateCallback = (response) => {
        if (response.success) {
            let getRate = new RatesBoard();
            getRate.clearTable();
            getRate.fillTable(response.data);
        }
    }

    ApiConnector.getStocks(rateCallback);
};
refresh();
setInterval(refresh, 60000);


const moneyManager = new MoneyManager();
let addingFunds = (data) => {
    let callback = (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Счет пополнен!');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    };

    ApiConnector.addMoney(data, callback);
};
moneyManager.addMoneyCallback = addingFunds;


let conversion = (data) => {
    let callback = (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация прошла успешно!');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    };
    ApiConnector.convertMoney(data, callback);
}
moneyManager.conversionMoneyCallback = conversion;


let transfer = (data) => {
    let callback = (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Денежные средства были отправлены!');
        } else {
            moneyManager.setMessage(false, response.error);
        }
    };
    ApiConnector.transferMoney(data, callback);
}
moneyManager.sendMoneyCallback = transfer;

const favoritesWidget = new FavoritesWidget();
let favCallback = (response) => {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
};
ApiConnector.getFavorites(favCallback);

let addUser = (data) => {
    let callback = (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    }

    ApiConnector.addUserToFavorites(data, callback);
}
favoritesWidget.addUserCallback = addUser;

let removeUser = (id) => {
    let callback = (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    }
    d
    ApiConnector.removeUserFromFavorites(id, callback);
}
favoritesWidget.removeUserCallback = removeUser;