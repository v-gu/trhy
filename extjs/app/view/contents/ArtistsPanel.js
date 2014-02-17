Ext.define('trhy.view.contents.ArtistsPanel', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.ux.grid.FiltersFeature',
        'Ext.ux.SlidingPager'
    ],
    xtype: 'artists_panel',
    
    store: 'Artists',

    selType: 'checkboxmodel',

    plugins: [
        'bufferedrenderer',
        {
            xclass: 'Ext.grid.plugin.RowEditing',
            clicksToMoveEditor: 1,
            autoCancel: false
        }
        /*, TODO: row expander {
          ptype: 'rowexpander',
          rowBodyTpl : new Ext.XTemplate(
          '<img src="{avatar}">'
          )
          } */
    ],
    features: [{
        ftype: 'filters',
        local: true
    }, {
        ftype: 'summary',
        dock: 'bottom'
    }],
    columns: [{
        xtype: 'rownumberer',
        sortable: false,
        locked: true
    },{
        text: '姓名',
        dataIndex: 'Name',
        editor: {
            xtype: 'textfield'
        },
        layout: 'fit',
        items: {
            xtype: 'textfield',
            enableKeyEvents: true,
            listeners: {
                keyup: function() {
                    var store = this.up('tablepanel').store;
                    store.clearFilter();
                    if (this.value) {
                        store.filter({
                            property: 'Name',
                            value: this.value,
                            anyMatch: true,
                            caseSensitive: false
                        });
                    }
                },
                buffer: 500
            }
        }
    }],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        pageSize: 25,
        store: "Artists",
        displayInfo: true,
        plugins: Ext.create('Ext.ux.SlidingPager', {})
    }],

    viewConfig: {
        stripeRows: true
    },

    listeners: {
        render: function(grid) {
            grid.getStore().load();
        }
    }
});
