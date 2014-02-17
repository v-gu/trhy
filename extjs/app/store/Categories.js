Ext.define('trhy.store.Categories', {
    extend: 'Ext.data.Store',
    requires: ['trhy.model.Category'],

    model: 'trhy.model.Category',

    data: [
        {id: 'artists', name: '艺术家', url: 'http://sencha.com/forum/external.php?type=RSS2'},
        {id: 'albums', name: '画册',   url: 'http://feeds.feedburner.com/ajaxian'},
        {id: 'works', name: '作品',   url: 'http://feeds.feedburner.com/extblog'},
        {id: 'clients', name: '客户',   url: 'http://feeds.feedburner.com/extblog'},
        {id: 'deals', name: '交易',   url: 'http://feeds.feedburner.com/extblog'},
        {id: 'prices', name: '价格',   url: 'http://feeds.feedburner.com/extblog'},
        {id: 'transactions', name: '流水',   url: 'http://feeds.feedburner.com/extblog'}
    ]
});
