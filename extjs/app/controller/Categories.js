Ext.define('Inventory.controller.Categories', {
    extend: 'Ext.app.Controller',

    stores: [
        'Categories'
    ],
    views: [
        'CategoryBar', 'ContentTabs',
        'contents.ArtistsPanel'
    ],
    refs: [
        {ref: 'cateView', selector: 'categorybar dataview'},
        {ref: 'contentTabs', selector: 'contenttabs'}
    ],

    init: function() {
        this.control({
            'categorybar dataview': {
                itemclick: this.loadCategory
            }
        });
    },

    onLaunch: function() {
        var dataview = this.getCateView(),
            store = this.getCategoriesStore();

        dataview.bindStore(store);
        // dataview.getSelectionModel().select(store.getAt(0));
    },

    loadCategory: function(view, record, item, index) {
        var tabPanel = this.getContentTabs(),
            id = record.get('id'),
            title = record.get('name'),
            tab = tabPanel.child('#' + id);
        
        if (null == tab) {
            tab = tabPanel.add({
                xtype: id + '_panel',
                itemId: id,
                title: title,
                closable: true
            });
        }
        tabPanel.setActiveTab(tab);
    }
});
