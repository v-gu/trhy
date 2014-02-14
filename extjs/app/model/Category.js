Ext.define('Inventory.model.Category', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'url', type: 'string' }

    ],

    proxy: {
        type: 'memory'
    }
});
