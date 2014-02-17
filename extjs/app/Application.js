Ext.define('trhy.Application', {
    name: 'trhy',
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
