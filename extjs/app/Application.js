Ext.define('Inventory.Application', {
    name: 'Inventory',
    appFolder: 'app',

    extend: 'Ext.app.Application',

    // views: [
    //     // TODO: add views here
    // ],

    controllers: [
        'Categories'
    ],

    stores: [
        'Artists'
    ]
});
