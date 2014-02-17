Ext.define('trhy.view.CategoryBar', {
    extend: 'Ext.panel.Panel',
    xtype: 'categorybar',

    title: '分类',
    layout: 'fit',
    collapsible: true,
    animCollapse: true,
    // margins: '5 0 5 5',

    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'dataview',
                trackOver: true,
                store: this.store,
                tpl: '<tpl for="."><div class="category-list-item">{name}</div></tpl>',
                itemSelector: 'div.category-list-item',
                cls: 'item-list',
                overItemCls: 'item-list-hover',
                listeners: {
                    selectionchange: this.onSelectionChange,
                    scope: this
                }
            }]
        });
        
        this.callParent(arguments);
    },

    onSelectionChange: function(selmodel, selection) {
    }
});
