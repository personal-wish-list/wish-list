export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        // open connection to the database `wish-list` with the version of 1
        const request = window.indexedDB.open('wish-list', 1);

        // create variables to hold reference to the database, transaction (tx), and object store
        let db, tx, store;

        // if version has changed (or if this is the first time using the database), run this method and create the three object stores
        request.onupgradeneeded = function (e) {
            const db = request.result;

            // create object store for each type of data and set "primary" key index to be the `_id` of the data

            // example:
            db.createObjectStore('wishlist', { keyPath: '_id' });
            db.createObjectStore('secret list', { keyPath: '_id' });
            db.createObjectStore('shopping list', { keyPath: '_id' });
        };

        // handle any errors with connecting
        request.onerror = function (err) {
            console.log('There was an error');
            console.error(err);
        };

        // on database open success
        request.onsuccess = function (e) {
            // save a reference of the database to the `db` variable
            db = request.result;
            // open a transaction do whatever we pass into `storeName` (must match one of the object store names)
            tx = db.transaction(storeName, 'readwrite');
            // save a reference to that object store
            store = tx.objectStore(storeName);

            // in case of errors, let us know
            db.onerror = function (err) {
                console.log('error', err);
            };

            switch (method) {
                case 'put':
                    store.put(object);
                    resolve(object);
                    break;
                case 'get':
                    const all = store.getAll();
                    all.onsuccess = function () {
                        resolve(all.result);
                    };
                    break;
                case 'delete':
                    store.delete(object._id);
                    break;
                default:
                    console.log('No valid method');
                    break;
            }

            // when the transaction is complete, close the connection
            tx.oncomplete = function () {
                db.close();
            };
        }
    });
}