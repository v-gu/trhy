Ext.define('trhy.model.Artist', {
    extend: 'Ext.data.Model',
    
    idProperty: 'Id',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string' }

    ],

    validations: [
        {type: 'presence', field: 'Name'},
        {type: 'length', field: 'Name', min: 1}
    ]

    // proxy: {
    //     type: 'ajax',
    //     url: 'QueryArtists'
    // }
});
