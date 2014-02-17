Ext.define('trhy.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'border',

    requires:[
        'Ext.layout.container.Fit'
    ],

    items: [{
        region: 'north',
        xtype: 'panel',
        border: 0,
        html: '<h2>天仁合艺:库存</h2>'
    },{
        region: 'west',
        width: 150,
        xtype: 'categorybar'
    }, {
        region: 'center',
        xtype: 'contenttabs'
    }]
});
