Ext.define('Inventory.view.ContentTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'contenttabs',

    defaults: {
        autoScroll: true
    },
    items: [{
        title: 'Tab 1',
        html: 'contents'
    },{
        title: 'Tab 2',
        html: 'contents'
    },{
        title: 'Tab 2',
        tabConfig: {
            title: 'Custom Title',
            tooltip: 'A button tooltip'
        }
    }]
});
